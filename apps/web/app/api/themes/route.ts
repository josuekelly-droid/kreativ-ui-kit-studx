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
    const themes = await prisma.theme.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(themes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, primaryColor, secondaryColor, accentColor, borderRadius, darkMode, spacing, fontSize } = body;

    // Vérifie si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: { id: userId, email: `${userId}@clerk.com`, name: "Utilisateur" },
      });
    }

    const theme = await prisma.theme.create({
      data: {
        name: name || `Thème du ${new Date().toLocaleDateString()}`,
        primaryColor,
        secondaryColor,
        accentColor,
        borderRadius,
        darkMode,
        spacing,
        fontSize,
        userId,
      },
    });
    return NextResponse.json(theme, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}