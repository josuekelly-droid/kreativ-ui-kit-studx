import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ error: "postId requis" }, { status: 400 });
    }

    // Vérifier si le like existe déjà
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });

      // 🔔 Créer une notification pour l'auteur du post
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { userId: true, title: true },
      });

      if (post && post.userId !== userId) {
        // Récupérer le nom depuis l'utilisateur Prisma ou utiliser un fallback
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { name: true },
        });
        const userName = user?.name || "Quelqu'un";

        await prisma.notification.create({
          data: {
            userId: post.userId,
            type: "like",
            message: `❤️ ${userName} a aimé votre publication "${post.title.substring(0, 50)}${post.title.length > 50 ? "..." : ""}"`,
            link: `/community`,
            read: false,
          },
        });
      }

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}