"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import AIGenerator from '../../components/AIGenerator';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  createdAt: string;
}

interface Download {
  id: string;
  type: string;
  name: string;
  format: string;
  createdAt: string;
}

interface AIGenerationItem {
  id: string;
  prompt: string;
  code: string;
  type: string;
  createdAt: string;
}

interface UserStats {
  totalThemes: number;
  aiGenerationsUsed: number;
  aiGenerationsLimit: number;
}

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [aiHistory, setAiHistory] = useState<AIGenerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadsLoading, setDownloadsLoading] = useState(true);
  const [aiHistoryLoading, setAiHistoryLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    totalThemes: 0,
    aiGenerationsUsed: 0,
    aiGenerationsLimit: 10,
  });

  useEffect(() => {
    if (isSignedIn) {
      fetchThemes();
      checkPremiumStatus();
      fetchUserStats();
      fetchAiHistory();
    }
  }, [isSignedIn]);

  // Charger les téléchargements uniquement si premium
  useEffect(() => {
    if (isSignedIn && isPremium) {
      fetchDownloads();
    } else {
      setDownloadsLoading(false);
    }
  }, [isSignedIn, isPremium]);

  // Notification quand il reste peu de générations
  useEffect(() => {
    if (!isPremium && stats.aiGenerationsLimit - stats.aiGenerationsUsed <= 3 && stats.aiGenerationsLimit - stats.aiGenerationsUsed > 0) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [stats.aiGenerationsUsed, isPremium]);

  const fetchThemes = async () => {
    try {
      const res = await fetch("/api/themes");
      if (res.ok) {
        const data = await res.json();
        setThemes(data);
        setStats(prev => ({ ...prev, totalThemes: data.length }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkPremiumStatus = async () => {
    try {
      const res = await fetch("/api/user/premium");
      if (res.ok) {
        const data = await res.json();
        setIsPremium(data.isPremium);
        setStats(prev => ({
          ...prev,
          aiGenerationsLimit: data.isPremium ? -1 : 10,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserStats = async () => {
    try {
      const res = await fetch("/api/user/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(prev => ({
          ...prev,
          aiGenerationsUsed: data.aiGenerationsUsed || 0,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDownloads = async () => {
    try {
      const res = await fetch("/api/downloads");
      if (res.ok) {
        const data = await res.json();
        setDownloads(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadsLoading(false);
    }
  };

  const fetchAiHistory = async () => {
    try {
      const res = await fetch("/api/ai/history");
      if (res.ok) {
        const data = await res.json();
        setAiHistory(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAiHistoryLoading(false);
    }
  };

  const loadTheme = async (themeId: string) => {
    try {
      const res = await fetch(`/api/themes/${themeId}`);
      if (res.ok) {
        const theme = await res.json();
        localStorage.setItem("kreativ-theme", JSON.stringify(theme));
        window.location.href = "/builder";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTheme = async (themeId: string) => {
    if (!confirm("Supprimer ce thème définitivement ?")) return;
    try {
      const res = await fetch(`/api/themes/${themeId}`, { method: "DELETE" });
      if (res.ok) {
        setThemes(themes.filter((t) => t.id !== themeId));
        setStats(prev => ({ ...prev, totalThemes: prev.totalThemes - 1 }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const exportStats = () => {
    const exportData = {
      user: user?.emailAddresses?.[0]?.emailAddress,
      premium: isPremium,
      stats: {
        totalThemes: stats.totalThemes,
        aiGenerationsUsed: stats.aiGenerationsUsed,
        aiGenerationsLimit: stats.aiGenerationsLimit,
      },
      themes: themes.map(t => ({ name: t.name, createdAt: t.createdAt, colors: { primary: t.primaryColor, secondary: t.secondaryColor } })),
      downloads: downloads.map(d => ({ type: d.type, name: d.name, format: d.format, createdAt: d.createdAt })),
      aiHistory: aiHistory.map(h => ({ prompt: h.prompt, type: h.type, createdAt: h.createdAt })),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kreativ-stats-${new Date().toISOString().slice(0, 19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Données pour le graphique
  const chartData = [
    { month: "Jan", themes: 0 },
    { month: "Fév", themes: 0 },
    { month: "Mar", themes: 0 },
    { month: "Avr", themes: 0 },
    { month: "Mai", themes: 0 },
    { month: "Juin", themes: 0 },
  ];

  themes.forEach(theme => {
    const month = new Date(theme.createdAt).getMonth();
    if (chartData[month]) chartData[month].themes += 1;
  });

  if (!isSignedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
        <p className="mb-8 text-gray-600">Connectez-vous pour accéder à toutes les fonctionnalités de Kreativ UI.</p>
        <Link href="/sign-in" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Se connecter
        </Link>
      </div>
    );
  }

  const remainingGenerations = isPremium ? -1 : Math.max(0, stats.aiGenerationsLimit - stats.aiGenerationsUsed);
  const progressPercent = isPremium ? 100 : (stats.aiGenerationsUsed / stats.aiGenerationsLimit) * 100;

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'component': return '🧩';
      case 'icon': return '🎨';
      case 'form': return '📝';
      case 'section': return '🏗️';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded-r-lg shadow-lg animate-pulse">
          <p className="font-semibold">⚠️ Attention</p>
          <p className="text-sm">Il vous reste {remainingGenerations} générations IA aujourd'hui. Passez Premium pour un accès illimité !</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Bannière Premium */}
        {!isPremium && (
          <div className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-amber-800">⭐ Passez à Premium</h3>
              <p className="text-amber-700 text-sm">Débloquez les téléchargements illimités, l'IA sans limite et toutes les sections</p>
            </div>
            <Link href="/pricing" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition whitespace-nowrap">
              Voir les offres
            </Link>
          </div>
        )}

        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="text-gray-500">
              👋 Bonjour, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Utilisateur"}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isPremium ? (
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold text-sm shadow-md">
                ⭐ Premium Actif
              </span>
            ) : (
              <Link href="/pricing" className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition text-sm shadow-md">
                ⭐ Passer Premium
              </Link>
            )}
            <Link href="/builder" className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition text-sm">
              + Nouveau thème
            </Link>
            <button onClick={exportStats} className="px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition text-sm">
              📥 Exporter stats
            </button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎨</span>
              <h3 className="font-semibold text-gray-600">Thèmes créés</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600">{stats.totalThemes}</p>
            <p className="text-sm text-gray-500 mt-1">Total de vos thèmes sauvegardés</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🤖</span>
              <h3 className="font-semibold text-gray-600">Générations IA</h3>
            </div>
            {isPremium ? (
              <>
                <p className="text-4xl font-bold text-green-600">Illimité</p>
                <p className="text-sm text-green-600 mt-1">✅ Premium actif</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold text-purple-600">{stats.aiGenerationsUsed} / {stats.aiGenerationsLimit}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{remainingGenerations} générations restantes aujourd'hui</p>
              </>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📦</span>
              <h3 className="font-semibold text-gray-600">Téléchargements</h3>
            </div>
            {isPremium ? (
              <p className="text-4xl font-bold text-green-600">Illimité</p>
            ) : (
              <div className="text-center py-2">
                <p className="text-gray-500 text-sm mb-2">⛔ Bloqué</p>
                <Link href="/pricing" className="text-purple-600 text-sm font-semibold hover:underline">Débloquer avec Premium →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Graphique d'activité */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📈 Activité mensuelle</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="themes" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-500 text-sm mt-4">Nombre de thèmes créés par mois</p>
        </div>

        {/* Section principale */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Liste des thèmes */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📁 Mes thèmes sauvegardés</h2>
            {loading ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Chargement...</p>
              </div>
            ) : themes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 mb-4">Aucun thème sauvegardé</p>
                <Link href="/builder" className="text-purple-600 font-semibold hover:underline">
                  ✨ Créer mon premier thème
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {themes.map((theme) => (
                  <div key={theme.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div>
                      <h3 className="font-semibold text-gray-800">{theme.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                        <span className="text-xs text-gray-400">{new Date(theme.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadTheme(theme.id)} className="px-3 py-1.5 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition font-medium">
                        Charger
                      </button>
                      <button onClick={() => deleteTheme(theme.id)} className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Premium */}
          <div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-xl font-bold mb-3">💎 Kreativ Premium</h2>
              {isPremium ? (
                <>
                  <p className="text-white/90 text-sm mb-4">Merci de faire partie de l'aventure Premium !</p>
                  <div className="bg-white/20 rounded-xl p-3">
                    <p className="text-sm">✅ Téléchargements illimités</p>
                    <p className="text-sm">✅ IA sans limite</p>
                    <p className="text-sm">✅ Support prioritaire</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white/90 text-sm mb-4">Débloquez tout le potentiel de Kreativ UI</p>
                  <Link href="/pricing" className="block text-center py-2 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition">
                    🚀 Passer Premium
                  </Link>
                </>
              )}
            </div>
            <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold mb-2">📈 Activité récente</h3>
              <p className="text-gray-500 text-sm">Dernier thème : {themes.length > 0 ? themes[0].name : "Aucun"}</p>
              <p className="text-gray-500 text-sm mt-1">Membre depuis : {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Section Téléchargements (Premium uniquement) */}
        {isPremium && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📥 Mes téléchargements</h2>
            {downloadsLoading ? (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Chargement...</p>
              </div>
            ) : downloads.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 mb-4">Aucun téléchargement pour le moment.</p>
                <Link href="/builder" className="text-purple-600 text-sm hover:underline">
                  Commencer à télécharger →
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {downloads.map((dl) => (
                  <div key={dl.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                          {getTypeIcon(dl.type)} {dl.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                          {dl.format.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(dl.createdAt).toLocaleDateString()} à {new Date(dl.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="text-green-600 text-sm">✅ Téléchargé</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section Historique IA */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🤖 Historique des générations IA</h2>
          {aiHistoryLoading ? (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : aiHistory.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500 mb-4">Aucune génération IA pour le moment.</p>
              <Link href="/about" className="text-purple-600 text-sm hover:underline">
                En savoir plus sur Kreativ UI →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {aiHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-600">
                          {item.type === 'component' ? '🧩 Composant' : '🏗️ Section'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()} à {new Date(item.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.prompt}</p>
                      <details className="mt-2">
                        <summary className="text-xs text-purple-600 cursor-pointer hover:underline">Voir le code généré</summary>
                        <pre className="mt-2 p-2 bg-gray-900 text-green-400 rounded-lg text-xs overflow-auto max-h-48">
                          <code>{item.code.substring(0, 500)}{item.code.length > 500 ? '...' : ''}</code>
                        </pre>
                      </details>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(item.code)}
                      className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition"
                    >
                      📋 Copier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assistant IA */}
        <AIGenerator />
      </div>
    </div>
  );
}