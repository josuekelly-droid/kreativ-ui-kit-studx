import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  // Récupérer ou créer l'utilisateur
  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: { id: userId, email: `${userId}@clerk.com` },
    });
  }

  // Vérifier la date et réinitialiser le compteur si nécessaire
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (user.aiGenerationsDate && new Date(user.aiGenerationsDate) < today) {
    await prisma.user.update({
      where: { id: userId },
      data: { aiGenerationsToday: 0, aiGenerationsDate: today },
    });
    user.aiGenerationsToday = 0;
  }

  // Vérifier la limite pour les utilisateurs gratuits (max 10 par jour)
  if (!user.isPremium && user.aiGenerationsToday >= 10) {
    return NextResponse.json({ 
      error: 'Limite quotidienne atteinte (10 générations). Passez à Premium pour un accès illimité !',
      limitReached: true 
    }, { status: 429 });
  }

  // Vérifier la clé API Groq
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'API IA non configurée' }, { status: 503 });
  }

  try {
    const { prompt, type } = await req.json();
    const { default: Groq } = await import('groq-sdk');
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    let systemPrompt = "";
    if (type === "component") {
      systemPrompt = `Tu es un expert React et Tailwind CSS. Génère uniquement le code du composant demandé, sans explication. Utilise des props. Sois professionnel. Ne réponds que par le code.`;
    } else if (type === "section") {
      systemPrompt = `Génère une section de page HTML/CSS complète et responsive. Utilise Tailwind CSS. Sois créatif et moderne. Ne réponds que par le code.`;
    } else {
      systemPrompt = `Tu es un assistant design system expert. Réponds de manière concise et utile.`;
    }

    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const generatedCode = response.choices[0]?.message?.content || "";

    // Incrémenter le compteur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        aiGenerationsToday: { increment: 1 },
        aiGenerationsDate: today
      },
    });

    const remaining = user.isPremium ? -1 : (10 - updatedUser.aiGenerationsToday);

    return NextResponse.json({ 
      success: true, 
      code: generatedCode,
      remaining: remaining,
      isPremium: user.isPremium
    });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Erreur IA' }, { status: 500 });
  }
}