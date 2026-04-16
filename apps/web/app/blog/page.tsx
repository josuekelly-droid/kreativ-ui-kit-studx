"use client";

import { useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const categories = [
    { id: "all", label: "Tous", icon: "📰" },
    { id: "nouveautes", label: "Nouveautés", icon: "✨" },
    { id: "tutoriels", label: "Tutoriels", icon: "🎓" },
    { id: "ia", label: "IA", icon: "🤖" },
  ];

  const articles = [
    { id: 1, slug: "assistant-ia-arrive", title: "L'assistant IA est arrivé !", excerpt: "Générez du code React/Tailwind instantanément.", date: "15 avril 2026", category: "ia", readTime: "3 min", image: "🤖", author: "Kelly Josué" },
    { id: 2, slug: "personnaliser-votre-theme", title: "Comment personnaliser votre thème", excerpt: "Découvrez comment utiliser le ThemeBuilder.", date: "10 avril 2026", category: "tutoriels", readTime: "5 min", image: "🎨", author: "Kelly Josué" },
    { id: 3, slug: "export-tailwind-config", title: "Nouveau : Export Tailwind Config", excerpt: "Exportez votre thème en fichier Tailwind.", date: "5 avril 2026", category: "nouveautes", readTime: "2 min", image: "📦", author: "Kelly Josué" },
    { id: 4, slug: "10-astuces-productivite", title: "10 astuces pour booster votre productivité", excerpt: "Gagnez du temps avec ces astuces.", date: "28 mars 2026", category: "tutoriels", readTime: "4 min", image: "⚡", author: "Kelly Josué" },
    { id: 5, slug: "premium-telechargements-illimites", title: "Premium : Téléchargements illimités", excerpt: "Téléchargements illimités pour les Premium.", date: "20 mars 2026", category: "nouveautes", readTime: "2 min", image: "💎", author: "Kelly Josué" },
    { id: 6, slug: "ia-genere-code-qualite", title: "Comment l'IA génère du code de qualité", excerpt: "Découvrez les coulisses de notre IA.", date: "15 mars 2026", category: "ia", readTime: "6 min", image: "🧠", author: "Kelly Josué" },
  ];

  const filteredArticles = activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setNewsletterStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setNewsletterStatus("success");
        setEmail("");
        setTimeout(() => setNewsletterStatus("idle"), 3000);
      } else {
        console.error(data.error);
        setNewsletterStatus("error");
        setTimeout(() => setNewsletterStatus("idle"), 3000);
      }
    } catch (error) {
      console.error(error);
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog & Actualités</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">Restez informé des dernières nouveautés.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-purple-100"
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-32 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-6xl">{article.image}</div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{article.date}</span> <span>•</span> <span>📖 {article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">👤 {article.author}</span>
                  <Link href={`/blog/${article.slug}`} className="text-purple-600 font-semibold text-sm hover:text-purple-800 transition">
                    Lire la suite →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16"><p className="text-gray-500">Aucun article dans cette catégorie.</p></div>
        )}

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">📧 Restez informé</h2>
          <p className="text-white/90 mb-6">
            Recevez les dernières actualités et tutoriels directement dans votre boîte mail.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={newsletterStatus === "loading"}
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {newsletterStatus === "loading" ? "..." : "S'abonner"}
            </button>
          </form>
          {newsletterStatus === "success" && (
            <p className="text-green-200 mt-3 text-sm">✅ Merci pour votre inscription !</p>
          )}
          {newsletterStatus === "error" && (
            <p className="text-red-200 mt-3 text-sm">❌ Erreur, réessayez.</p>
          )}
        </div>
      </div>
    </div>
  );
}