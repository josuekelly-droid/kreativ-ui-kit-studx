import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "../data/articles";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

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