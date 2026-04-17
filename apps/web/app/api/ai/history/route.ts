import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const history = await prisma.aIGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    return NextResponse.json(history);
  } catch (error) {
    console.error("Erreur historique IA:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}