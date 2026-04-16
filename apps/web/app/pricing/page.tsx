"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";

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
        window.location.href = "/dashboard";
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

      {/* Plans (inchangés) */}
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

      {/* Tableau comparatif détaillé */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Comparaison détaillée</h2>
        <p className="text-center text-gray-600 mb-12">Découvrez précisément ce que chaque plan vous offre</p>
        
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
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Personnalisation du thème</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Sauvegarde cloud</td>
                <td className="p-4 text-center">1 thème</td>
                <td className="p-4 text-center text-green-600">Illimité</td>
                <td className="p-4 text-center text-green-600">Illimité</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Export JSON / CSS / Tailwind</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Téléchargement HTML/React</td>
                <td className="p-4 text-center text-red-500">✗</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Accès complet (50+ sections)</td>
                <td className="p-4 text-center text-red-500">✗ (5 seulement)</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Accès complet (40+ formulaires)</td>
                <td className="p-4 text-center text-red-500">✗ (5 seulement)</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Export ZIP du kit complet</td>
                <td className="p-4 text-center text-red-500">✗</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Assistant IA (10 générations/jour)</td>
                <td className="p-4 text-center text-yellow-600">10/jour</td>
                <td className="p-4 text-center text-green-600">Illimité</td>
                <td className="p-4 text-center text-green-600">Illimité</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold">Support prioritaire</td>
                <td className="p-4 text-center text-red-500">✗</td>
                <td className="p-4 text-center text-green-600">✓</td>
                <td className="p-4 text-center text-green-600">✓</td>
              </tr>
              <tr className="hover:bg-gray-50 transition bg-purple-50">
                <td className="p-4 font-semibold">Économie réalisée</td>
                <td className="p-4 text-center">-</td>
                <td className="p-4 text-center">-</td>
                <td className="p-4 text-center font-bold text-purple-600">2 mois offerts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pourquoi passer à Premium */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Pourquoi passer à Premium ?</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Débloquez tout le potentiel de Kreativ UI Kit Pro
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Productivité maximale</h3>
              <p className="opacity-80">Gagnez du temps avec les exports et l'IA illimitée</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Créativité sans limites</h3>
              <p className="opacity-80">Accédez à toutes les sections et tous les formulaires</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-2">Support prioritaire</h3>
              <p className="opacity-80">Une assistance rapide et dédiée</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Questions fréquentes</h2>
        <p className="text-center text-gray-600 mb-12">Tout ce que vous devez savoir sur nos offres</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Puis-je passer du gratuit au premium plus tard ?</h3>
            <p className="text-gray-600">Oui, à tout moment. Vos thèmes sauvegardés restent accessibles.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Puis-je résilier mon abonnement ?</h3>
            <p className="text-gray-600">Oui, depuis votre tableau de bord. Aucun engagement.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Quels moyens de paiement sont acceptés ?</h3>
            <p className="text-gray-600">PayPal, carte bancaire (via PayPal). Paiement sécurisé.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Y a-t-il une période d'essai ?</h3>
            <p className="text-gray-600">Le plan gratuit vous permet de tester toutes les fonctionnalités de base.</p>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="py-20 text-center bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à passer à la vitesse supérieure ?</h2>
          <p className="text-white opacity-90 mb-8">Rejoignez des milliers d'utilisateurs qui ont choisi Kreativ UI Pro</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/sign-up" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
              🚀 Créer un compte gratuit
            </a>
            <a href="#top" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition">
              💰 Voir les offres
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}