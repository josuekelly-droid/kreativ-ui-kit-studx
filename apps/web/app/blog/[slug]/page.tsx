import { notFound } from "next/navigation";
import Link from "next/link";

// Définition des articles (à synchroniser avec ceux du blog)
const articles = [
  {
    id: 1,
    slug: "assistant-ia-arrive",
    title: "L'assistant IA est arrivé !",
    excerpt: "Générez du code React/Tailwind instantanément.",
    content: `
      <p>Nous sommes ravis de vous annoncer le lancement de notre assistant IA intégré !</p>
      <h2>Comment ça fonctionne ?</h2>
      <p>Il vous suffit de décrire le composant ou la section que vous souhaitez créer, et notre IA génère le code React/Tailwind correspondant.</p>
      <h2>Exemple de prompt</h2>
      <pre><code>"Crée une carte de présentation pour un développeur freelance avec une photo, un nom, une spécialité et un bouton de contact"</code></pre>
      <h2>Limites actuelles</h2>
      <p>Les utilisateurs gratuits bénéficient de 10 générations par jour. Les utilisateurs Premium ont un accès illimité.</p>
      <h2>Accès à l'IA</h2>
      <p>Rendez-vous dans votre tableau de bord (Dashboard) pour tester l'assistant IA dès maintenant !</p>
    `,
    date: "15 avril 2026",
    category: "ia",
    readTime: "3 min",
    image: "🤖",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 2,
    slug: "personnaliser-votre-theme",
    title: "Comment personnaliser votre thème",
    excerpt: "Découvrez comment utiliser le ThemeBuilder.",
    content: `
      <p>Le ThemeBuilder est l'outil central de Kreativ UI Kit Pro. Il vous permet de personnaliser chaque aspect visuel de votre design system.</p>
      <h2>Les paramètres disponibles</h2>
      <ul>
        <li><strong>Couleur primaire</strong> : la couleur principale</li>
        <li><strong>Couleur secondaire</strong> : pour les accents</li>
        <li><strong>Border-radius</strong> : l'arrondi des coins</li>
        <li><strong>Mode sombre</strong> : activez le thème sombre</li>
      </ul>
    `,
    date: "10 avril 2026",
    category: "tutoriels",
    readTime: "5 min",
    image: "🎨",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 3,
    slug: "export-tailwind-config",
    title: "Nouveau : Export Tailwind Config",
    excerpt: "Exportez votre thème en fichier Tailwind.",
    content: `
      <p>Nouvelle fonctionnalité : l'export de votre thème en fichier de configuration Tailwind !</p>
      <h2>Comment utiliser cette fonctionnalité ?</h2>
      <p>Après avoir personnalisé votre thème, cliquez sur "Exporter le thème" puis sélectionnez "Tailwind Config".</p>
    `,
    date: "5 avril 2026",
    category: "nouveautes",
    readTime: "2 min",
    image: "📦",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 4,
    slug: "10-astuces-productivite",
    title: "10 astuces pour booster votre productivité",
    excerpt: "Gagnez du temps avec ces astuces.",
    content: `
      <p>Voici 10 astuces pour tirer le meilleur parti de Kreativ UI Kit Pro.</p>
      <h2>1. Utilisez les raccourcis clavier</h2>
      <h2>2. Sauvegardez vos thèmes dans le cloud</h2>
      <h2>3. Exploitez l'assistant IA</h2>
      <h2>4. Exportez vos composants individuellement</h2>
      <h2>5. Utilisez le mode sombre</h2>
    `,
    date: "28 mars 2026",
    category: "tutoriels",
    readTime: "4 min",
    image: "⚡",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 5,
    slug: "premium-telechargements-illimites",
    title: "Premium : Téléchargements illimités",
    excerpt: "Téléchargements illimités pour les Premium.",
    content: `
      <p>Les utilisateurs Premium bénéficient désormais de téléchargements illimités.</p>
      <h2>Comment devenir Premium ?</h2>
      <p>Rendez-vous sur la page Tarifs pour choisir l'abonnement qui vous convient.</p>
    `,
    date: "20 mars 2026",
    category: "nouveautes",
    readTime: "2 min",
    image: "💎",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 6,
    slug: "ia-genere-code-qualite",
    title: "Comment l'IA génère du code de qualité",
    excerpt: "Découvrez les coulisses de notre IA.",
    content: `
      <p>Notre assistant IA utilise le modèle Llama 3.3 70B via Groq.</p>
      <h2>Pourquoi la qualité est-elle si bonne ?</h2>
      <p>Nous utilisons des prompts système sophistiqués qui guident l'IA vers les meilleures pratiques.</p>
    `,
    date: "15 mars 2026",
    category: "ia",
    readTime: "6 min",
    image: "🧠",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
];

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-16 text-center text-white">
        <Link href="/blog" className="inline-block mb-4 text-white/80 hover:text-white transition">
          ← Retour au blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-center gap-4 text-white/80">
          <span>{article.date}</span>
          <span>•</span>
          <span>📖 {article.readTime}</span>
          <span>•</span>
          <span>👤 {article.author}</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-8xl">
            {article.image}
          </div>
          <div className="p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-purple-700 prose-a:text-purple-600"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">📧 Ne manquez aucune actualité</h2>
          <p className="text-white/90 mb-6">Inscrivez-vous à la newsletter.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              alert("Merci pour votre inscription !");
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              required
              className="flex-1 px-4 py-3 rounded-xl text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}