"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import AIGenerator from '../../components/AIGenerator';

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchThemes();
      checkPremiumStatus();
    }
  }, [isSignedIn]);

  const fetchThemes = async () => {
    try {
      const res = await fetch("/api/themes");
      if (res.ok) {
        const data = await res.json();
        setThemes(data);
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
      }
    } catch (error) {
      console.error(error);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
        <p className="mb-8 text-gray-600">Connectez-vous pour accéder à vos thèmes sauvegardés.</p>
        <Link href="/sign-in" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">
            Bonjour, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Utilisateur"}
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {isPremium ? (
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold text-sm">
              ⭐ Premium Actif
            </span>
          ) : (
            <Link href="/pricing" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
              ⭐ Passer Premium
            </Link>
          )}
          <Link href="/builder" className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition text-sm">
            + Nouveau thème
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Liste des thèmes */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Mes thèmes sauvegardés</h2>
          {loading ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : themes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 mb-4">Aucun thème sauvegardé</p>
              <Link href="/builder" className="text-purple-600 hover:underline">
                Créer mon premier thème →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {themes.map((theme) => (
                <div key={theme.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
                  <div>
                    <h3 className="font-semibold">{theme.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                      <span className="text-xs text-gray-500">{new Date(theme.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => loadTheme(theme.id)} className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition">
                      Charger
                    </button>
                    <button onClick={() => deleteTheme(theme.id)} className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Aperçu</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">Thèmes sauvegardés</p>
              <p className="text-3xl font-bold text-purple-600">{themes.length}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm">Statut</p>
              {isPremium ? (
                <p className="text-green-600 font-semibold">✅ Premium – Accès complet</p>
              ) : (
                <div>
                  <p className="text-gray-600">⚠️ Compte gratuit</p>
                  <Link href="/pricing" className="text-sm text-purple-600 hover:underline">
                    Débloquer tous les téléchargements →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AIGenerator />
    </div>
  );
}