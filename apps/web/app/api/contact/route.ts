import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Sauvegarde en base
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email: email.toLowerCase(), message },
    });

    console.log("✅ Message sauvegardé, ID:", contactMessage.id);

    return NextResponse.json({ 
      success: true, 
      message: "Message envoyé avec succès !" 
    });
  } catch (error) {
    console.error("❌ Contact error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}