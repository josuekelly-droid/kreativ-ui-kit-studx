import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">🎨 Kreativ UI Kit Pro</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Créez votre design system en temps réel. Personnalisez, exportez, et téléchargez vos composants.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/builder" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition">
            🚀 Commencer gratuitement
          </Link>
          <Link href="/pricing" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition">
            💰 Voir les tarifs
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Fonctionnalités puissantes</h2>
        <p className="text-center text-gray-600 mb-12">Tout ce dont vous avez besoin pour créer des interfaces exceptionnelles</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎨", title: "Personnalisation avancée", desc: "Couleurs, bordures, espacements, mode sombre" },
            { icon: "📦", title: "100+ icônes", desc: "Téléchargez vos icônes en HTML, React ou Tailwind" },
            { icon: "📝", title: "40+ formulaires", desc: "Formulaires prêts à l'emploi pour tous vos besoins" },
            { icon: "🧩", title: "50+ sections", desc: "Sections de page professionnelles" },
            { icon: "☁️", title: "Sauvegarde cloud", desc: "Retrouvez vos thèmes sur tous vos appareils" },
            { icon: "💰", title: "Export complet", desc: "HTML, React, Tailwind, ZIP — tout est possible" },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition bg-white">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center text-white">
          <div>
            <div className="text-4xl font-bold">100+</div>
            <div className="opacity-90">Icônes</div>
          </div>
          <div>
            <div className="text-4xl font-bold">40+</div>
            <div className="opacity-90">Formulaires</div>
          </div>
          <div>
            <div className="text-4xl font-bold">50+</div>
            <div className="opacity-90">Sections</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à créer votre design system ?</h2>
        <p className="text-gray-600 mb-8">Commencez gratuitement, évoluez au besoin</p>
        <Link href="/builder" className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition">
          🎨 Lancer le ThemeBuilder
        </Link>
      </div>
    </div>
  );
}