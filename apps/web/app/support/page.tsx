import Link from "next/link";

export default function SupportPage() {
  const faqs = [
    { q: "Comment sauvegarder mon thème ?", a: "Cliquez sur 'Sauvegarder' dans le ThemeBuilder. Connectez-vous pour la sauvegarde cloud." },
    { q: "Comment utiliser l'assistant IA ?", a: "Rendez-vous dans le Dashboard, décrivez votre composant, l'IA génère le code." },
    { q: "Comment passer Premium ?", a: "Allez dans la page Tarifs, choisissez votre abonnement et payez par PayPal." },
    { q: "Puis-je exporter mon thème ?", a: "Oui, exportez en JSON, CSS Variables ou Tailwind Config." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-16 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Support</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">Comment pouvons-nous vous aider ?</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">📚</div>
            <h2 className="text-xl font-bold mb-2">Documentation</h2>
            <p className="text-gray-600 mb-4">Guides détaillés pour chaque fonctionnalité</p>
            <Link href="/docs" className="text-purple-600 font-semibold hover:underline">Voir la documentation →</Link>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">📧</div>
            <h2 className="text-xl font-bold mb-2">Contactez-nous</h2>
            <p className="text-gray-600 mb-4">Une question ? Écrivez-nous</p>
            <Link href="/contact" className="text-purple-600 font-semibold hover:underline">Formulaire de contact →</Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="mb-4">Contactez notre équipe directement</p>
          <Link href="/contact" className="inline-block px-6 py-2 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition">
            Contacter le support
          </Link>
        </div>
      </div>
    </div>
  );
}