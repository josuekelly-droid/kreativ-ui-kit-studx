import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log("📧 Email reçu:", email);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Test de connexion à la base
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Base de données connectée");
    } catch (dbError) {
      console.error("❌ Connexion DB échouée:", dbError);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Déjà inscrit" }, { status: 409 });
    }

    const subscriber = await prisma.subscriber.create({ data: { email } });
    console.log("✅ Inscrit:", subscriber.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Newsletter error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}