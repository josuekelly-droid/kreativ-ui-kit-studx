"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    free: {
      name: "Gratuit",
      price: 0,
      features: [
        "✅ Personnalisation du thème",
        "✅ Sauvegarde cloud (1 thème)",
        "✅ Export JSON / CSS / Tailwind",
        "❌ Téléchargement HTML/React",
        "❌ Accès complet aux sections",
        "❌ Support prioritaire",
      ],
      cta: "Commencer gratuitement",
      popular: false,
    },
    monthly: {
      name: "Pro Mensuel",
      price: 9.99,
      features: [
        "✅ Tout ce qui est gratuit",
        "✅ Sauvegarde cloud illimitée",
        "✅ Téléchargement HTML/React",
        "✅ Accès complet (50+ sections)",
        "✅ Accès complet (40+ formulaires)",
        "✅ Export en ZIP du kit complet",
        "✅ Support prioritaire",
      ],
      cta: "S'abonner",
      popular: true,
    },
    yearly: {
      name: "Pro Annuel",
      price: 79.99,
      features: [
        "✅ Tout ce qui est gratuit",
        "✅ Sauvegarde cloud illimitée",
        "✅ Téléchargement HTML/React",
        "✅ Accès complet (50+ sections)",
        "✅ Accès complet (40+ formulaires)",
        "✅ Export en ZIP du kit complet",
        "✅ Support prioritaire",
        "✅ 2 mois offerts",
      ],
      cta: "S'abonner",
      popular: false,
    },
  };

  const handlePayPalSuccess = async (plan: string, details: any) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID: details.orderID,
          plan: plan,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`🎉 Merci pour votre abonnement ${plan === "monthly" ? "mensuel" : "annuel"} !`);
        // Rediriger vers le builder ou dashboard
        window.location.href = "/builder";
      } else {
        alert("❌ Erreur lors du paiement");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">💰 Tarifs</h1>
        <p className="text-xl opacity-90">Choisissez le plan qui vous convient</p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 ${
                plan.popular ? "ring-4 ring-purple-500 scale-105" : ""
              }`}
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)" }}
            >
              {plan.popular && (
                <div className="bg-purple-600 text-white text-center py-2 font-semibold">
                  🌟 Le plus populaire
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-purple-600 mb-6">
                  {plan.price === 0 ? "Gratuit" : `${plan.price}€`}
                  {plan.price > 0 && <span className="text-sm font-normal">/mois</span>}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.price === 0 ? (
                  <a
                    href="/sign-up"
                    className="block text-center py-3 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                      currency: "EUR",
                      intent: "capture",
                    }}
                  >
                    {selectedPlan === key ? (
                      <div className="space-y-3">
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={async () => {
                            const response = await fetch("/api/paypal/create-order", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ plan: key }),
                            });
                            const order = await response.json();
                            return order.id;
                          }}
                          onApprove={(data) => handlePayPalSuccess(key, data)}
                          onError={() => alert("Erreur PayPal")}
                        />
                        <button
                          onClick={() => setSelectedPlan(null)}
                          className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedPlan(key as "monthly" | "yearly")}
                        disabled={isProcessing}
                        className="w-full py-3 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
                      >
                        {plan.cta}
                      </button>
                    )}
                  </PayPalScriptProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}