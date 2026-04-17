import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true },
        },
        comments: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });
    }

    // Vérifier si l'utilisateur connecté a liké
    const { userId } = await auth();
    let likedByUser = false;
    if (userId) {
      const like = await prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: id,
            userId,
          },
        },
      });
      likedByUser = !!like;
    }

    return NextResponse.json({ ...post, likedByUser });
  } catch (error) {
    console.error("GET post error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}