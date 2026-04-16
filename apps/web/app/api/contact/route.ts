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

    // 1. Sauvegarder le message en base de données
    const contact = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    // 2. Envoyer un email à l'admin
    try {
      await resend.emails.send({
        from: "Kreativ UI <onboarding@resend.dev>",
        to: ["kelly.webnux@gmail.com"],
        subject: `Nouveau message de ${name}`,
        replyTo: email,
        html: `
          <h2>📬 Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr/>
          <p><small>Message ID: ${contact.id}</small></p>
        `,
      });
      console.log("✅ Email admin envoyé");
    } catch (emailErr) {
      console.error("❌ Erreur envoi email admin:", emailErr);
    }

    // 3. Envoyer un accusé de réception à l'utilisateur
    try {
      await resend.emails.send({
        from: "Kreativ UI <onboarding@resend.dev>",
        to: [email],
        subject: "Nous avons bien reçu votre message",
        html: `
          <h2>Bonjour ${name},</h2>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <p>Merci de votre confiance !</p>
          <br/>
          <p>L'équipe Kreativ UI</p>
        `,
      });
      console.log("✅ Email confirmation envoyé à", email);
    } catch (emailErr) {
      console.error("❌ Erreur envoi email utilisateur:", emailErr);
    }

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}