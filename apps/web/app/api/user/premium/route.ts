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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true, premiumExpiresAt: true },
    });

    const isPremium = user?.isPremium === true && user?.premiumExpiresAt !== null && new Date() < new Date(user.premiumExpiresAt);

    return NextResponse.json({ isPremium: isPremium || false });
  } catch (error) {
    console.error("Premium status error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}