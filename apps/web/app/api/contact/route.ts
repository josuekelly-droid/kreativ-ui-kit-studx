import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    // Sauvegarde en base
    const contact = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    // Envoi d'email (optionnel, ne bloque pas si erreur)
    try {
      await resend.emails.send({
        from: "Kreativ UI <onboarding@resend.dev>",
        to: ["contact@kreativ-ui.com"],
        subject: `Nouveau message de ${name}`,
        replyTo: email,
        html: `<h2>Message de ${name}</h2><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      });
    } catch (emailErr) {
      console.log("Email non envoyé, mais message sauvegardé");
    }

    return NextResponse.json({ success: true, message: "Message envoyé !" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}