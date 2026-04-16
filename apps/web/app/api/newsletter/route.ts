import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Format email invalide" }, { status: 400 });
    }

    // Vérifier si déjà inscrit
    const existing = await prisma.subscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json({ error: "Cet email est déjà inscrit" }, { status: 409 });
    }

    // Créer l'inscription
    const subscriber = await prisma.subscriber.create({
      data: { email: email.toLowerCase() },
    });

    console.log("✅ Nouvel inscrit:", subscriber.id, subscriber.email);

    return NextResponse.json({ 
      success: true, 
      message: "Inscription réussie !" 
    });
  } catch (error) {
    console.error("❌ Newsletter error:", error);
    return NextResponse.json({ 
      error: "Erreur serveur, réessayez plus tard" 
    }, { status: 500 });
  }
}