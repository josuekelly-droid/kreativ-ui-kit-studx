"use client";

import { useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

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
      </div>
    </div>
  );
}