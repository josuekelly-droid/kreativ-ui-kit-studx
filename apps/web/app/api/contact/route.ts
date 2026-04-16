import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    console.log("📨 Message reçu:", { name, email, message });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Sauvegarde en base
    let contactMessage = null;
    try {
      contactMessage = await prisma.contactMessage.create({
        data: { name, email, message },
      });
      console.log("✅ Message sauvegardé en base, ID:", contactMessage.id);
    } catch (dbError) {
      console.error("❌ Erreur base de données:", dbError);
    }

    // Envoi d'emails (optionnel)
    if (resend) {
      try {
        await resend.emails.send({
          from: "Kreativ UI <onboarding@resend.dev>",
          to: ["contact@kreativ-ui.com"],
          subject: `Nouveau message de ${name}`,
          replyTo: email,
          html: `<h2>Nouveau message</h2><p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
        });
        console.log("✅ Email admin envoyé");
      } catch (emailError) {
        console.error("❌ Erreur email admin:", emailError);
      }

      try {
        await resend.emails.send({
          from: "Kreativ UI <onboarding@resend.dev>",
          to: [email],
          subject: "Nous avons bien reçu votre message",
          html: `<h2>Bonjour ${name},</h2><p>Nous avons bien reçu votre message et vous répondrons rapidement.</p><p>L'équipe Kreativ UI</p>`,
        });
        console.log("✅ Email utilisateur envoyé");
      } catch (emailError) {
        console.error("❌ Erreur email utilisateur:", emailError);
      }
    } else {
      console.log("⚠️ Resend non configuré, emails non envoyés");
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message envoyé avec succès !" 
    });
  } catch (error) {
    console.error("❌ Erreur générale:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}