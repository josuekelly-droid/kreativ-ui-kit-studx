"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "Sophie Martin", role: "Lead Designer @ CreativeLab", content: "Un outil exceptionnel qui a révolutionné notre workflow. Gain de temps incroyable !", rating: 5, avatar: "👩‍🎨" },
    { name: "Thomas Dubois", role: "Développeur Fullstack", content: "La génération IA de code est bluffante. Je gagne des heures sur chaque projet.", rating: 5, avatar: "👨‍💻" },
    { name: "Marie Lambert", role: "Chef de produit @ TechCorp", content: "Notre équipe l'utilise au quotidien. Le meilleur investissement de l'année.", rating: 5, avatar: "👩‍💼" },
    { name: "David Ngoma", role: "CTO @ StartupHub", content: "Une plateforme solide qui nous a permis de livrer nos projets plus rapidement.", rating: 5, avatar: "👨‍💼" },
    { name: "Claire Dupont", role: "UX Designer Freelance", content: "La personnalisation est infinie. Je recommande à tous mes clients !", rating: 5, avatar: "👩‍🎨" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section avec animation */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-center text-white animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slide-in">🎨 Kreativ UI Kit Pro</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-in-delay">
          Créez votre design system en temps réel. Personnalisez, exportez, et téléchargez vos composants.
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in">
          <Link href="/builder" className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 duration-300">
            🚀 Commencer gratuitement
          </Link>
          <Link href="/pricing" className="px-8 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition transform hover:scale-105 duration-300">
            💰 Voir les tarifs
          </Link>
        </div>
      </div>

      {/* Statistiques avec animation au scroll */}
      <div className="max-w-6xl mx-auto px-4 py-16 animate-on-scroll">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10K+", label: "Utilisateurs actifs", delay: 0 },
            { value: "500+", label: "Projets créés", delay: 100 },
            { value: "99%", label: "Satisfaction client", delay: 200 },
            { value: "50K+", label: "Revenus générés", delay: 300 },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${stat.delay}ms` }}>
              <div className="text-4xl font-bold text-purple-600">{stat.value}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in-up">Fonctionnalités puissantes</h2>
        <p className="text-center text-gray-600 mb-12 animate-fade-in-up">Tout ce dont vous avez besoin pour créer des interfaces exceptionnelles</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎨", title: "Personnalisation avancée", desc: "Couleurs, bordures, espacements, mode sombre" },
            { icon: "📦", title: "100+ icônes", desc: "Téléchargez vos icônes en HTML, React ou Tailwind" },
            { icon: "📝", title: "40+ formulaires", desc: "Formulaires prêts à l'emploi pour tous vos besoins" },
            { icon: "🧩", title: "50+ sections", desc: "Sections de page professionnelles" },
            { icon: "☁️", title: "Sauvegarde cloud", desc: "Retrouvez vos thèmes sur tous vos appareils" },
            { icon: "💰", title: "Export complet", desc: "HTML, React, Tailwind, ZIP — tout est possible" },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assistant IA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 animate-pulse">
            <span className="text-2xl">🤖</span>
            <span className="font-semibold">Nouveauté</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">Assistant IA intégré</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in-up">
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

      {/* Témoignages - Carrousel Slider */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in-up">Ils nous font confiance</h2>
        <p className="text-center text-gray-600 mb-12 animate-fade-in-up">Des milliers de développeurs et designers utilisent Kreativ UI</p>
        
        <div className="relative">
          {/* Carrousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="p-8 rounded-2xl shadow-xl bg-gradient-to-br from-white to-purple-50 transform transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl bg-gradient-to-br from-purple-600 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center text-white shadow-lg">
                        {t.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{t.name}</h3>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">
                      {"⭐".repeat(t.rating)}
                    </div>
                    <p className="text-gray-600 italic text-lg">"{t.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons de navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            ◀
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            ▶
          </button>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === i ? "w-8 bg-purple-600" : "w-2 bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center text-white">
          <div className="animate-float">
            <div className="text-4xl font-bold">100+</div>
            <div className="opacity-90">Icônes</div>
          </div>
          <div className="animate-float-delay">
            <div className="text-4xl font-bold">40+</div>
            <div className="opacity-90">Formulaires</div>
          </div>
          <div className="animate-float-delay-2">
            <div className="text-4xl font-bold">50+</div>
            <div className="opacity-90">Sections</div>
          </div>
        </div>
      </div>

      {/* CTA Section finale */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Prêt à créer votre design system ?</h2>
        <p className="text-gray-600 mb-8 animate-fade-in-up">Commencez gratuitement, évoluez au besoin</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/builder" className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition transform hover:scale-105 duration-300">
            🎨 Lancer le ThemeBuilder
          </Link>
          <Link href="/dashboard" className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition transform hover:scale-105 duration-300">
            🤖 Tester l'IA
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }
        .animate-slide-in-delay {
          animation: slideIn 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-timeline: view();
          animation-range: entry 0% entry 50%;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s ease-in-out 0.5s infinite;
        }
        .animate-float-delay-2 {
          animation: float 3s ease-in-out 1s infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}