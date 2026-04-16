"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqs = [
    { q: "🚀 Puis-je changer d'avis plus tard ?", a: "Absolument ! Passez du gratuit au premium à tout moment depuis votre tableau de bord." },
    { q: "💳 Quels moyens de paiement ?", a: "PayPal et cartes bancaires. Paiement 100% sécurisé." },
    { q: "🔄 Puis-je résilier mon abonnement ?", a: "Oui, sans frais ni engagement. Vous gardez vos thèmes." },
    { q: "🎁 Y a-t-il une période d'essai ?", a: "Le plan gratuit vous permet de tester toutes les fonctionnalités de base sans limite de temps." },
    { q: "📦 Que deviennent mes thèmes si je résilie ?", a: "Ils restent accessibles, mais les exports premium seront bloqués." },
  ];

  const handlePayPalSuccess = async (plan: string, details: any) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: details.orderID, plan }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`🎉 Merci pour votre abonnement ${plan === "monthly" ? "mensuel" : "annuel"} !`);
        window.location.href = "/dashboard";
      } else {
        alert("❌ Erreur lors du paiement");
      }
    } catch (error) {
      alert("Erreur réseau");
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">✨ Choisissez votre aventure ✨</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
          Des offres pensées pour les créateurs, les startups et les entreprises.
        </p>
      </div>

      {/* Plans tarifaires */}
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
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 font-semibold">
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
                    <li key={i} className="text-gray-600 text-sm">{feature}</li>
                  ))}
                </ul>
                {plan.price === 0 ? (
                  <Link href="/sign-up" className="block text-center py-3 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                    {plan.cta}
                  </Link>
                ) : (
                  <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency: "EUR", intent: "capture" }}>
                    {selectedPlan === key ? (
                      <div className="space-y-3">
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={async () => {
                            const res = await fetch("/api/paypal/create-order", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ plan: key }),
                            });
                            const order = await res.json();
                            return order.id;
                          }}
                          onApprove={(data) => handlePayPalSuccess(key, data)}
                          onError={() => alert("Erreur PayPal")}
                        />
                        <button onClick={() => setSelectedPlan(null)} className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm">
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setSelectedPlan(key as "monthly" | "yearly")} disabled={isProcessing} className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition">
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

      {/* Tableau comparatif */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">📊 Comparateur</h2>
        <p className="text-center text-gray-600 mb-12">Découvrez ce qui vous attend</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <th className="p-4 text-left">Fonctionnalité</th>
                <th className="p-4 text-center">Gratuit</th>
                <th className="p-4 text-center">Pro Mensuel</th>
                <th className="p-4 text-center">Pro Annuel</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Personnalisation</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Sauvegarde cloud</td><td className="p-4 text-center">1 thème</td><td className="p-4 text-center text-green-600">Illimité</td><td className="p-4 text-center text-green-600">Illimité</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Export JSON/CSS/Tailwind</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Téléchargement HTML/React</td><td className="p-4 text-center text-red-500">✗</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Sections (50+)</td><td className="p-4 text-center">5</td><td className="p-4 text-center text-green-600">50+</td><td className="p-4 text-center text-green-600">50+</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Formulaires (40+)</td><td className="p-4 text-center">5</td><td className="p-4 text-center text-green-600">40+</td><td className="p-4 text-center text-green-600">40+</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Export ZIP</td><td className="p-4 text-center text-red-500">✗</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Assistant IA</td><td className="p-4 text-center">10/jour</td><td className="p-4 text-center text-green-600">Illimité</td><td className="p-4 text-center text-green-600">Illimité</td></tr>
              <tr className="hover:bg-gray-50 transition"><td className="p-4 font-semibold">Support prioritaire</td><td className="p-4 text-center text-red-500">✗</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pourquoi passer à Premium */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-700 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">💎 Débloquez la puissance créative</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">Ce que vous gagnez en passant à l'offre Premium</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-2">Illimité</h3>
              <p className="opacity-80">Téléchargements, exports, générations IA sans limite</p>
            </div>
            <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-2">Complet</h3>
              <p className="opacity-80">Toutes les sections et tous les formulaires débloqués</p>
            </div>
            <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-2">Prioritaire</h3>
              <p className="opacity-80">Support réactif et assistance dédiée</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordéon */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">❓ Des questions ?</h2>
        <p className="text-center text-gray-600 mb-12">Les réponses à vos interrogations</p>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <button onClick={() => toggleFaq(i)} className="w-full px-6 py-4 text-left font-semibold text-lg flex justify-between items-center hover:bg-purple-50 transition">
                <span>{faq.q}</span>
                <span className={`text-2xl transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div className="py-20 text-center bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">🚀 Prêt à passer à l'action ?</h2>
          <p className="text-white opacity-90 mb-8 text-lg">Rejoignez une communauté de créateurs qui transforment leurs idées en réalité</p>
          <Link href="/sign-up" className="inline-block px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition hover:scale-105">
            Créer mon compte gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
}