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
      icon: "🎁",
      features: [
        "Personnalisation du thème",
        "Sauvegarde cloud (+25 thèmes)",
        "Export JSON / CSS / Tailwind",
        "Téléchargement HTML/React",
        "Accès complet aux sections",
        "Support prioritaire",
      ],
      included: [true, true, true, false, false, false],
      cta: "Commencer gratuitement",
      popular: false,
    },
    monthly: {
      name: "Pro Mensuel",
      price: 9.99,
      icon: "⚡",
      features: [
        "Personnalisation du thème",
        "Sauvegarde cloud illimitée",
        "Export JSON / CSS / Tailwind",
        "Téléchargement HTML/React",
        "Accès complet (50+ sections)",
        "Support prioritaire",
      ],
      included: [true, true, true, true, true, true],
      cta: "S'abonner",
      popular: true,
    },
    yearly: {
      name: "Pro Annuel",
      price: 79.99,
      icon: "💎",
      features: [
        "Personnalisation du thème",
        "Sauvegarde cloud illimitée",
        "Export JSON / CSS / Tailwind",
        "Téléchargement HTML/React",
        "Accès complet (50+ sections)",
        "Support prioritaire",
      ],
      included: [true, true, true, true, true, true],
      cta: "S'abonner",
      popular: false,
    },
  };

  const faqs = [
    { q: "Puis-je changer d'avis plus tard ?", a: "Oui, passez du gratuit au premium à tout moment depuis votre tableau de bord." },
    { q: "Quels moyens de paiement ?", a: "PayPal et cartes bancaires. Paiement 100% sécurisé." },
    { q: "Puis-je résilier mon abonnement ?", a: "Oui, sans frais ni engagement. Vous gardez vos thèmes." },
    { q: "Y a-t-il une période d'essai ?", a: "Le plan gratuit vous permet de tester toutes les fonctionnalités de base." },
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
        alert(`Merci pour votre abonnement ${plan === "monthly" ? "mensuel" : "annuel"} !`);
        window.location.href = "/dashboard";
      } else {
        alert("Erreur lors du paiement");
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight animate-fade-in">Des offres pensées pour vous</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-delay">
          Choisissez le plan qui correspond à vos besoins. Évoluez à votre rythme.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan], idx) => (
            <div
              key={key}
              className={`rounded-2xl overflow-hidden bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up ${
                plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-medium tracking-wide animate-pulse-light">
                  RECOMMANDÉ
                </div>
              )}
              <div className="p-8">
                <div className="text-5xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900">{plan.price === 0 ? "Gratuit" : `${plan.price}€`}</span>
                  {plan.price > 0 && <span className="text-slate-500">/mois</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <span className={plan.included[i] ? "text-green-500" : "text-red-400"}>
                        {plan.included[i] ? "✓" : "✗"}
                      </span>
                      <span className={!plan.included[i] ? "text-slate-400" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.price === 0 ? (
                  <Link
                    href="/sign-up"
                    className="block text-center py-3 rounded-xl font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition transform hover:scale-105"
                  >
                    {plan.cta}
                  </Link>
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
                        <button
                          onClick={() => setSelectedPlan(null)}
                          className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition text-sm"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedPlan(key as "monthly" | "yearly")}
                        disabled={isProcessing}
                        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition transform hover:scale-105"
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

      {/* Comparaison */}
      <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Comparaison détaillée</h2>
        <p className="text-center text-slate-500 mb-12">Tout voir en un coup d'œil</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-pink-100 border-b">
                <th className="p-4 text-left text-slate-700">Fonctionnalité</th>
                <th className="p-4 text-center text-slate-700">🎁 Gratuit</th>
                <th className="p-4 text-center text-slate-700">⚡ Pro Mensuel</th>
                <th className="p-4 text-center text-slate-700">💎 Pro Annuel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-purple-50 transition"><td className="p-4">Personnalisation</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-purple-50 transition"><td className="p-4">Sauvegarde cloud</td><td className="p-4 text-center">+25 thèmes</td><td className="p-4 text-center text-green-600">Illimité</td><td className="p-4 text-center text-green-600">Illimité</td></tr>
              <tr className="hover:bg-purple-50 transition"><td className="p-4">Export JSON/CSS/Tailwind</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-purple-50 transition"><td className="p-4">Téléchargement HTML/React</td><td className="p-4 text-center text-red-500">✗</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
              <tr className="hover:bg-purple-50 transition"><td className="p-4">Sections & formulaires</td><td className="p-4 text-center">5/5</td><td className="p-4 text-center text-green-600">50+ / 40+</td><td className="p-4 text-center text-green-600">50+ / 40+</td></tr>
              <tr className="hover:bg-purple-50 transition"><td className="p-4">Support prioritaire</td><td className="p-4 text-center text-red-500">✗</td><td className="p-4 text-center text-green-600">✓</td><td className="p-4 text-center text-green-600">✓</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pourquoi Premium */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">Pourquoi passer à Premium ?</h2>
          <p className="text-purple-200 mb-12 max-w-2xl mx-auto animate-fade-in-delay">
            Débloquez tout le potentiel de Kreativ UI Kit
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Illimité</h3>
              <p className="text-purple-200">Téléchargements, exports, générations IA sans restriction</p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Complet</h3>
              <p className="text-purple-200">Toutes les sections et tous les formulaires débloqués</p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">Prioritaire</h3>
              <p className="text-purple-200">Support réactif et assistance dédiée</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Questions fréquentes</h2>
        <p className="text-center text-slate-500 mb-12">Tout ce que vous devez savoir</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 text-left font-medium text-slate-800 flex justify-between items-center hover:bg-purple-50 transition"
              >
                {faq.q}
                <span className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-slate-500 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center animate-float">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-purple-100 mb-8">Rejoignez des milliers d'utilisateurs</p>
          <Link
            href="/sign-up"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition hover:scale-105"
          >
            Créer un compte gratuit
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseLight {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-light {
          animation: pulseLight 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}