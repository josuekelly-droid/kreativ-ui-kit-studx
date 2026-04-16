export default function AboutPage() {
  const stats = [
    { value: "10K+", label: "Utilisateurs actifs" },
    { value: "500+", label: "Projets créés" },
    { value: "99%", label: "Satisfaction client" },
    { value: "50K+", label: "Revenus générés" },
  ];

  const values = [
    { icon: "🎨", title: "Créativité", desc: "Libérez votre créativité sans contraintes techniques" },
    { icon: "⚡", title: "Performance", desc: "Des outils rapides et optimisés pour gagner du temps" },
    { icon: "🤝", title: "Communauté", desc: "Une communauté grandissante de créateurs passionnés" },
    { icon: "🔒", title: "Confiance", desc: "Vos données sont sécurisées et protégées" },
  ];

  const team = [
    { name: "Kelly Josué AKPLOGAN", role: "Fondateur & Designer", avatar: "👨‍🎨", bio: "Designer passionné par les interfaces et l'expérience utilisateur." },
  ];

  const technologies = ["Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL (Neon)", "Clerk (Auth)", "PayPal", "Groq (IA)", "Prisma"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">À propos de Kreativ UI</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Nous croyons que la création d'interfaces ne devrait jamais être une contrainte.
        </p>
      </div>

      {/* Notre mission */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vous offrir les outils nécessaires pour créer des interfaces cohérentes, belles et maintenables,
            sans passer des heures à tout recoder.
          </p>
        </div>

        {/* Chiffres clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition">
              <div className="text-3xl font-bold text-purple-600">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pourquoi Kreativ UI */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Pourquoi Kreativ UI ?</h2>
          <p className="text-center text-gray-600 mb-10">Une solution complète pour les créateurs modernes</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2">Personnalisation en temps réel</h3>
              <p className="text-gray-600">Modifiez couleurs, bordures, espacements et voyez le résultat instantanément.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="text-xl font-bold mb-2">Export multi-format</h3>
              <p className="text-gray-600">Téléchargez vos créations en HTML, React ou Tailwind CSS.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl mb-3">☁️</div>
              <h3 className="text-xl font-bold mb-2">Sauvegarde cloud</h3>
              <p className="text-gray-600">Retrouvez vos thèmes sur tous vos appareils.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-xl font-bold mb-2">Assistant IA intégré</h3>
              <p className="text-gray-600">Générez du code React/Tailwind instantanément.</p>
            </div>
          </div>
        </div>

        {/* Nos valeurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nos valeurs</h2>
          <p className="text-center text-gray-600 mb-10">Ce qui nous guide au quotidien</p>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{val.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* L'équipe */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">L'équipe</h2>
          <p className="text-center text-gray-600 mb-10">Des passionnés à votre service</p>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md w-80">
              <div className="text-6xl mb-3">{team[0].avatar}</div>
              <h3 className="text-xl font-bold text-gray-800">{team[0].name}</h3>
              <p className="text-purple-600 text-sm mb-2">{team[0].role}</p>
              <p className="text-gray-500 text-sm">{team[0].bio}</p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Technologies</h2>
          <p className="text-center text-gray-600 mb-10">Une stack moderne et robuste</p>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">Prêt à créer votre design system ?</h2>
          <p className="text-white/90 mb-6">Rejoignez des milliers d'utilisateurs</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/builder" className="bg-white text-purple-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition">
              🎨 Lancer le ThemeBuilder
            </a>
            <a href="/sign-up" className="bg-transparent border-2 border-white px-6 py-2 rounded-xl font-semibold hover:bg-white/10 transition">
              📝 Créer un compte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}