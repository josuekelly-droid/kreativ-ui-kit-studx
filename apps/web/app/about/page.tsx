export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">À propos</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Kreativ UI Kit Pro est un générateur de design system créé pour les designers et développeurs modernes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Notre mission</h2>
        <p>
          Vous offrir les outils nécessaires pour créer des interfaces cohérentes, belles et maintenables,
          sans passer des heures à tout recoder.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Pourquoi Kreativ UI ?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>🎨 Personnalisation en temps réel</li>
          <li>📦 Export multi-format (HTML, React, Tailwind)</li>
          <li>☁️ Sauvegarde cloud de vos thèmes</li>
          <li>🔒 Authentification sécurisée</li>
          <li>💳 Paiements intégrés (PayPal)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Technologies</h2>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Next.js 16</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">TypeScript</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Tailwind CSS</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">PostgreSQL (Neon)</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Clerk (Auth)</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">PayPal</span>
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-2xl text-center">
          <p className="text-lg font-semibold text-purple-800">
            Créé avec ❤️ pour les designers et développeurs du monde entier
          </p>
        </div>
      </div>
    </div>
  );
}