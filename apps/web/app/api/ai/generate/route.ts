import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { prompt, type } = await req.json();

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

    return NextResponse.json({ success: true, code: generatedCode });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Erreur IA' }, { status: 500 });
  }
}