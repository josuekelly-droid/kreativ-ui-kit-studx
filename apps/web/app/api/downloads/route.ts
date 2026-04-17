import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Récupérer tous les téléchargements de l'utilisateur
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const downloads = await prisma.download.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(downloads);
  } catch (error) {
    console.error("Erreur récupération téléchargements:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST - Enregistrer un téléchargement
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { type, name, format } = await request.json();

    if (!type || !name || !format) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    const download = await prisma.download.create({
      data: {
        userId,
        type,
        name,
        format,
      },
    });

    return NextResponse.json({ success: true, id: download.id });
  } catch (error) {
    console.error("Erreur enregistrement téléchargement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}