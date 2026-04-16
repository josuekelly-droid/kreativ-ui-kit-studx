import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: "Déjà inscrit" }, { status: 409 });
    }

    const subscriber = await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json({ success: true, id: subscriber.id });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}