import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const authString = `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
  const base64Auth = Buffer.from(authString).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64Auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { orderID, plan } = await request.json();

    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const capture = await response.json();

    if (capture.status === "COMPLETED") {
      // Mettre à jour l'utilisateur dans la base de données
      const expiresAt = new Date();
      if (plan === "monthly") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      await prisma.user.upsert({
        where: { id: userId },
        update: {
          isPremium: true,
          premiumExpiresAt: expiresAt,
        },
        create: {
          id: userId,
          email: `${userId}@clerk.com`,
          isPremium: true,
          premiumExpiresAt: expiresAt,
        },
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Paiement non complété" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la capture" }, { status: 500 });
  }
}