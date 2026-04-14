import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const PAYPAL_API = "https://api-m.paypal.com";

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const authString = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { plan } = await request.json();
    const amount = plan === "monthly" ? "9.99" : "79.99";

    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: amount,
            },
            description: `Abonnement Kreativ UI Kit Pro - ${plan === "monthly" ? "Mensuel" : "Annuel"}`,
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paypal/capture-order?plan=${plan}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        },
      }),
    });

    const order = await response.json();

    if (!order.id) {
      console.error("PayPal error:", order);
      return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
    }

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}