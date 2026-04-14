import Link from "next/link";

export default function DocsPage() {
  const sections = [
    {
      title: "🎨 Personnalisation du thème",
      content: "Utilisez le panneau de gauche pour modifier les couleurs, le border-radius, l'espacement et activer le mode sombre. Les changements sont appliqués en temps réel.",
    },
    {
      title: "💾 Sauvegarde locale",
      content: "Cliquez sur 'Sauvegarder' pour enregistrer votre thème dans votre navigateur. Il sera automatiquement chargé au prochain démarrage.",
    },
    {
      title: "☁️ Sauvegarde cloud",
      content: "Connectez-vous avec Clerk, puis cliquez sur 'Sauvegarder dans le cloud'. Vos thèmes seront accessibles sur tous vos appareils et dans votre Dashboard.",
    },
    {
      title: "📤 Export du thème",
      content: "Vous pouvez exporter votre thème au format JSON, CSS Variables ou Tailwind Config. Idéal pour intégrer vos styles dans vos projets.",
    },
    {
      title: "📥 Téléchargement de composants",
      content: "Chaque icône, formulaire et section peut être téléchargé individuellement en HTML, React ou Tailwind (selon votre abonnement).",
    },
    {
      title: "⭐ Passer Premium",
      content: "Accédez à tous les téléchargements, à l'export ZIP et au support prioritaire via la page Tarifs. Paiement sécurisé par PayPal.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">📚 Documentation</h1>
      <p className="text-gray-600 mb-8">Apprenez à utiliser Kreativ UI Kit Pro comme un pro.</p>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-purple-50 rounded-2xl text-center">
        <p className="text-lg font-semibold text-purple-800 mb-4">Besoin d'aide supplémentaire ?</p>
        <Link href="/contact" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Contacter le support
        </Link>
      </div>
    </div>
  );
}