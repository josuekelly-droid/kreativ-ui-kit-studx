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
    const { postId, content } = await request.json();

    if (!postId || !content) {
      return NextResponse.json({ error: "postId et content requis" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
      include: {
        user: {
          select: { name: true, email: true, isPremium: true },
        },
      },
    });

    // 🔔 Créer une notification pour l'auteur du post (sauf si c'est l'auteur lui-même)
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true, title: true },
    });

    if (post && post.userId !== userId) {
      // Récupérer le nom de l'utilisateur qui commente
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });
      const userName = user?.name || "Quelqu'un";

      await prisma.notification.create({
        data: {
          userId: post.userId,
          type: "comment",
          message: `💬 ${userName} a commenté votre publication "${post.title.substring(0, 50)}${post.title.length > 50 ? "..." : ""}"`,
          link: `/community`,
          read: false,
        },
      });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Comment error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}