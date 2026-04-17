import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Récupérer tous les posts (avec filtres)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  try {
    const where = type && type !== "all" ? { type } : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Vérifier si l'utilisateur connecté a liké chaque post
    const { userId } = await auth();
    let likedPosts: string[] = [];
    if (userId) {
      const likes = await prisma.like.findMany({
        where: { userId },
        select: { postId: true },
      });
      likedPosts = likes.map((l) => l.postId);
    }

    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      likedByUser: likedPosts.includes(post.id),
    }));

    return NextResponse.json(postsWithLikeStatus);
  } catch (error) {
    console.error("GET posts error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST - Créer un nouveau post
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { title, content, type } = await request.json();

    if (!title || !content || !type) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type,
        userId,
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST post error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}