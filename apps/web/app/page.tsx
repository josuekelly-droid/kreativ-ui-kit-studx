"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const testimonials = [
    { 
      name: "Sophie Martin", 
      role: "Lead Designer @ CreativeLab", 
      content: "Un outil exceptionnel qui a révolutionné notre workflow. Gain de temps incroyable !", 
      rating: 5, 
      avatar: "👩‍🎨",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    { 
      name: "Thomas Dubois", 
      role: "Développeur Fullstack", 
      content: "La génération IA de code est bluffante. Je gagne des heures sur chaque projet.", 
      rating: 5, 
      avatar: "👨‍💻",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    { 
      name: "Marie Lambert", 
      role: "Chef de produit @ TechCorp", 
      content: "Notre équipe l'utilise au quotidien. Le meilleur investissement de l'année.", 
      rating: 5, 
      avatar: "👩‍💼",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    { 
      name: "David Ngoma", 
      role: "CTO @ StartupHub", 
      content: "Une plateforme solide qui nous a permis de livrer nos projets plus rapidement.", 
      rating: 5, 
      avatar: "👨‍💼",
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    { 
      name: "Claire Dupont", 
      role: "UX Designer Freelance", 
      content: "La personnalisation est infinie. Je recommande à tous mes clients !", 
      rating: 5, 
      avatar: "👩‍🎨",
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isDragging, testimonials.length]);

  const nextSlide = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Gestion du drag pour mobile/desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
      alert(data.error || "Erreur lors de l'inscription");
      setNewsletterStatus("idle");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur réseau");
    setNewsletterStatus("idle");
  }
};

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">🎨 Kreativ UI Kit</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up-delay">
          Créez votre design system en temps réel. Personnalisez, exportez, et téléchargez vos composants.
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up-delay-2">
          <Link href="/builder" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 duration-300">
            🚀 Commencer gratuitement
          </Link>
          <Link href="/pricing" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition transform hover:scale-105 duration-300">
            💰 Voir les tarifs
          </Link>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10K+", label: "Utilisateurs actifs", icon: "👥" },
            { value: "500+", label: "Projets créés", icon: "🚀" },
            { value: "99%", label: "Satisfaction client", icon: "⭐" },
            { value: "50K+", label: "Revenus générés", icon: "💰" },
          ].map((stat, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-purple-600">{stat.value}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
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
            <div key={i} className="group p-6 rounded-2xl text-center bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assistant IA Section */}
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
            <Link href="/dashboard" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 duration-300">
              🤖 Essayer l'IA gratuitement
            </Link>
            <Link href="/pricing" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition transform hover:scale-105 duration-300">
              📦 10 générations offertes
            </Link>
          </div>
        </div>
      </div>

      {/* Témoignages - Design Premium */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ce que nos utilisateurs disent
          </h2>
          <p className="text-gray-600 text-lg">Rejoignez une communauté de créateurs passionnés</p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4 md:px-6">
                  <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-8 md:p-10 hover:shadow-3xl transition-all duration-500">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                            <img
                              src={t.image}
                              alt={t.name}
                              className="w-full h-full rounded-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-full rounded-full bg-white flex items-center justify-center text-4xl';
                                  fallback.textContent = t.avatar;
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-5 h-5 border-2 border-white"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800">{t.name}</h3>
                            <p className="text-purple-600 font-medium">{t.role}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(t.rating)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed italic">
                          "{t.content}"
                        </blockquote>
                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                          </svg>
                          <span>Client vérifié</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentTestimonial === i
                    ? "w-10 h-2 bg-purple-600"
                    : "w-2 h-2 bg-purple-300 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
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
          <Link href="/builder" className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition transform hover:scale-105 duration-300">
            🎨 Lancer le ThemeBuilder
          </Link>
          <Link href="/dashboard" className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition transform hover:scale-105 duration-300">
            🤖 Tester l'IA
          </Link>
        </div>
      </div>

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

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-up-delay {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}