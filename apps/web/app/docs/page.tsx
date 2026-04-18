import Link from "next/link";

export default function DocsPage() {
  const sections = [
    {
      title: "Personnalisation du thème",
      icon: "🎨",
      content: "Utilisez le panneau de gauche pour modifier les couleurs, le border-radius, l'espacement et activer le mode sombre. Les changements sont appliqués en temps réel.",
    },
    {
      title: "Sauvegarde locale",
      icon: "💾",
      content: "Cliquez sur 'Sauvegarder' pour enregistrer votre thème dans votre navigateur. Il sera automatiquement chargé au prochain démarrage.",
    },
    {
      title: "Sauvegarde cloud",
      icon: "☁️",
      content: "Connectez-vous avec Clerk, puis cliquez sur 'Sauvegarder dans le cloud'. Vos thèmes seront accessibles sur tous vos appareils et dans votre Dashboard.",
    },
    {
      title: "Export du thème",
      icon: "📤",
      content: "Vous pouvez exporter votre thème au format JSON, CSS Variables ou Tailwind Config. Idéal pour intégrer vos styles dans vos projets.",
    },
    {
      title: "Téléchargement de composants",
      icon: "📥",
      content: "Chaque icône, formulaire et section peut être téléchargé individuellement en HTML, React ou Tailwind (selon votre abonnement).",
    },
    {
      title: "Passer Premium",
      icon: "⭐",
      content: "Accédez à tous les téléchargements, à l'export ZIP et au support prioritaire via la page Tarifs. Paiement sécurisé par PayPal.",
    },
  ];

  const aiExamples = [
    { prompt: "Crée une carte de présentation pour un développeur freelance", type: "Composant" },
    { prompt: "Génère une section hero pour une startup SaaS", type: "Section" },
    { prompt: "Crée un formulaire d'inscription avec validation", type: "Composant" },
    { prompt: "Génère une landing page pour un produit digital", type: "Section" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-lg text-gray-600">
          Tout ce que vous devez savoir pour maîtriser Kreativ UI Kit
        </p>
      </div>

      {/* Nouveauté IA - Section mise en avant */}
      <div className="mb-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">NOUVEAU</span>
          <span className="text-2xl">🤖</span>
        </div>
        <h2 className="text-3xl font-bold mb-3">Assistant IA intégré</h2>
        <p className="text-white/90 mb-6 text-lg">
          Générez du code React/Tailwind instantanément. Décrivez ce que vous voulez, l'IA le crée pour vous.
        </p>
        
        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-3">✨ Exemples de prompts</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {aiExamples.map((ex, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3">
                <div className="text-sm text-white/70 mb-1">{ex.type}</div>
                <div className="font-mono text-sm">"{ex.prompt}"</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="bg-white text-purple-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            🚀 Essayer l'IA gratuitement
          </Link>
          <Link
            href="/pricing"
            className="bg-transparent border-2 border-white px-6 py-2 rounded-xl font-semibold hover:bg-white/10 transition"
          >
            📦 10 générations offertes
          </Link>
        </div>
      </div>

      {/* Limites de l'IA */}
      <div className="mb-16 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">⚡</span>
          <h3 className="font-bold text-amber-800">Limites quotidiennes</h3>
        </div>
        <p className="text-amber-700 mb-2">
          Les utilisateurs gratuits bénéficient de <strong>10 générations par jour</strong>.
          Passez à Premium pour un accès illimité.
        </p>
        <Link href="/pricing" className="text-amber-800 underline font-semibold text-sm">
          Voir les offres Premium →
        </Link>
      </div>

      {/* Sections de documentation */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {sections.map((section, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-3xl mb-3">{section.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Section astuces */}
      <div className="mb-16 bg-gray-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">💡</span>
          <h2 className="text-2xl font-bold text-gray-800">Astuces & bonnes pratiques</h2>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-2">✓ Sauvegardez régulièrement vos thèmes dans le cloud pour ne rien perdre</li>
          <li className="flex gap-2">✓ Utilisez l'IA pour générer des composants de base, puis personnalisez-les</li>
          <li className="flex gap-2">✓ Exportez vos thèmes en Tailwind Config pour les intégrer directement dans vos projets</li>
          <li className="flex gap-2">✓ Passez à Premium pour débloquer tous les téléchargements et l'IA illimitée</li>
        </ul>
      </div>

      {/* FAQ rapide */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">L'IA est-elle vraiment gratuite ?</h3>
            <p className="text-gray-600">Oui, 10 générations par jour pour les utilisateurs gratuits. Premium = illimité.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Puis-je utiliser le code généré commercialement ?</h3>
            <p className="text-gray-600">Oui, le code généré vous appartient. Utilisation commerciale autorisée.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Quels modèles d'IA sont utilisés ?</h3>
            <p className="text-gray-600">Nous utilisons Groq (Llama 3.3 70B) pour des générations rapides et de qualité.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Puis-je sauvegarder mes prompts ?</h3>
            <p className="text-gray-600">Cette fonctionnalité arrivera bientôt. Restez connectés !</p>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-10 text-white">
        <h2 className="text-2xl font-bold mb-3">Prêt à créer votre design system ?</h2>
        <p className="text-white/90 mb-6">Commencez gratuitement, évoluez au besoin</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/builder"
            className="bg-white text-purple-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition"
          >
            🎨 Lancer le ThemeBuilder
          </Link>
          <Link
            href="/dashboard"
            className="bg-transparent border-2 border-white px-6 py-2 rounded-xl font-semibold hover:bg-white/10 transition"
          >
            🤖 Tester l'IA
          </Link>
        </div>
      </div>
    </div>
  );
}