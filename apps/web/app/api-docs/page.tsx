import Link from "next/link";

export default function ApiDocsPage() {
  const endpoints = [
    { method: "POST", path: "/api/contact", desc: "Envoyer un message de contact" },
    { method: "POST", path: "/api/newsletter", desc: "S'inscrire à la newsletter" },
    { method: "GET", path: "/api/themes", desc: "Récupérer les thèmes de l'utilisateur" },
    { method: "POST", path: "/api/themes", desc: "Créer un nouveau thème" },
    { method: "DELETE", path: "/api/themes/{id}", desc: "Supprimer un thème" },
    { method: "POST", path: "/api/ai/generate", desc: "Générer du code avec l'IA (Premium)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-16 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">API Documentation</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">Intégrez Kreativ UI dans vos propres applications</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="bg-gray-800 text-white p-4">
            <h2 className="font-mono text-lg">Base URL</h2>
            <code className="text-green-400">https://kreativ-ui-kit-studx.vercel.app/api</code>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
        <div className="space-y-3 mb-12">
          {endpoints.map((endpoint, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                endpoint.method === "GET" ? "bg-green-600" :
                endpoint.method === "POST" ? "bg-blue-600" :
                endpoint.method === "DELETE" ? "bg-red-600" : "bg-gray-600"
              }`}>
                {endpoint.method}
              </span>
              <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm">{endpoint.path}</code>
              <span className="text-gray-600">{endpoint.desc}</span>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-bold text-yellow-800 mb-2">🔐 Authentification</h3>
          <p className="text-yellow-700 text-sm">
            Les endpoints qui nécessitent une authentification utilisent Clerk. 
            Connectez-vous d'abord pour obtenir votre session.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact" className="text-purple-600 hover:underline">
            Une question sur l'API ? Contactez-nous →
          </Link>
        </div>
      </div>
    </div>
  );
}