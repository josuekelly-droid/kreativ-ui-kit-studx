import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">🎨 Kreativ UI Kit Pro</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Créez votre design system en temps réel. Personnalisez, exportez, et téléchargez vos composants.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/builder" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
            🚀 Commencer gratuitement
          </Link>
          <Link href="/pricing" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition transform hover:scale-105">
            💰 Voir les tarifs
          </Link>
        </div>
      </div>

      {/* Statistiques crédibles */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-4xl font-bold text-purple-600">10K+</div>
            <div className="text-gray-600 mt-1">Utilisateurs actifs</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-4xl font-bold text-purple-600">500+</div>
            <div className="text-gray-600 mt-1">Projets créés</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-4xl font-bold text-purple-600">99%</div>
            <div className="text-gray-600 mt-1">Satisfaction client</div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-4xl font-bold text-purple-600">50K+</div>
            <div className="text-gray-600 mt-1">Revenus générés</div>
          </div>
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
            <div key={i} className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition bg-white transform hover:-translate-y-1">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assistant IA Section - NOUVEAU */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🤖</span>
            <span className="font-semibold">Nouveauté</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Assistant IA intégré</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Générez du code React/Tailwind instantanément. Décrivez votre composant, l'IA le crée pour vous.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
              🤖 Essayer l'IA gratuitement
            </Link>
            <Link href="/pricing" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition">
              📦 10 générations offertes
            </Link>
          </div>
        </div>
      </div>

      {/* Témoignages clients - NOUVEAU */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Ils nous font confiance</h2>
        <p className="text-center text-gray-600 mb-12">Des milliers de développeurs et designers utilisent Kreativ UI</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sophie Martin", role: "Lead Designer @ CreativeLab", content: "Un outil exceptionnel qui a révolutionné notre workflow. Gain de temps incroyable !", rating: 5, avatar: "👩‍🎨" },
            { name: "Thomas Dubois", role: "Développeur Fullstack", content: "La génération IA de code est bluffante. Je gagne des heures sur chaque projet.", rating: 5, avatar: "👨‍💻" },
            { name: "Marie Lambert", role: "Chef de produit @ TechCorp", content: "Notre équipe l'utilise au quotidien. Le meilleur investissement de l'année.", rating: 5, avatar: "👩‍💼" },
          ].map((t, i) => (
            <div key={i} className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{t.avatar}</div>
                <div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {"⭐".repeat(t.rating)}
              </div>
              <p className="text-gray-600 italic">"{t.content}"</p>
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

      {/* CTA Section finale */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à créer votre design system ?</h2>
        <p className="text-gray-600 mb-8">Commencez gratuitement, évoluez au besoin</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/builder" className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition transform hover:scale-105">
            🎨 Lancer le ThemeBuilder
          </Link>
          <Link href="/dashboard" className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition">
            🤖 Tester l'IA
          </Link>
        </div>
      </div>
    </div>
  );
}