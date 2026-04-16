import { notFound } from "next/navigation";
import Link from "next/link";

// Données des articles directement dans le fichier (pas d'import externe)
const articles = [
  { id: 1, slug: "assistant-ia-arrive", title: "L'assistant IA est arrivé !", content: "<p>Nous sommes ravis de vous annoncer le lancement de notre assistant IA intégré !</p><p>Décrivez ce que vous voulez, l'IA le crée pour vous.</p>", date: "15 avril 2026", readTime: "3 min", image: "🤖", author: "Kelly Josué" },
  { id: 2, slug: "personnaliser-votre-theme", title: "Comment personnaliser votre thème", content: "<p>Le ThemeBuilder vous permet de personnaliser chaque aspect visuel de votre design system.</p>", date: "10 avril 2026", readTime: "5 min", image: "🎨", author: "Kelly Josué" },
  { id: 3, slug: "export-tailwind-config", title: "Nouveau : Export Tailwind Config", content: "<p>Exportez votre thème directement en fichier de configuration Tailwind.</p>", date: "5 avril 2026", readTime: "2 min", image: "📦", author: "Kelly Josué" },
  { id: 4, slug: "10-astuces-productivite", title: "10 astuces pour booster votre productivité", content: "<p>Voici 10 astuces pour tirer le meilleur parti de Kreativ UI Kit Pro.</p>", date: "28 mars 2026", readTime: "4 min", image: "⚡", author: "Kelly Josué" },
  { id: 5, slug: "premium-telechargements-illimites", title: "Premium : Téléchargements illimités", content: "<p>Les utilisateurs Premium bénéficient désormais de téléchargements illimités.</p>", date: "20 mars 2026", readTime: "2 min", image: "💎", author: "Kelly Josué" },
  { id: 6, slug: "ia-genere-code-qualite", title: "Comment l'IA génère du code de qualité", content: "<p>Notre assistant IA utilise le modèle Llama 3.3 70B via Groq.</p>", date: "15 mars 2026", readTime: "6 min", image: "🧠", author: "Kelly Josué" },
];

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-16 text-center text-white">
        <Link href="/blog" className="inline-block mb-4 text-white/80 hover:text-white transition">← Retour au blog</Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-center gap-4 text-white/80">
          <span>{article.date}</span> <span>•</span> <span>📖 {article.readTime}</span> <span>•</span> <span>👤 {article.author}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-8xl">{article.image}</div>
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition">← Voir tous les articles</Link>
        </div>
      </div>
    </div>
  );
}