"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function AIGenerator() {
  const { isSignedIn } = useUser();
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('component');
  const [remainingGenerations, setRemainingGenerations] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const handleGenerate = async () => {
    if (!isSignedIn) {
      alert('Connecte-toi pour utiliser l\'IA');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type }),
      });
      const data = await res.json();
      
      if (data.code) {
        setGeneratedCode(data.code);
        if (data.remaining !== undefined) {
          setRemainingGenerations(data.remaining);
        }
        if (data.isPremium !== undefined) {
          setIsPremium(data.isPremium);
        }
      } else if (data.limitReached) {
        alert('🔒 Limite quotidienne atteinte (10 générations). Passe à Premium pour un accès illimité !');
      } else {
        alert(data.error || 'Erreur génération');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">✨ Assistant IA Premium</h2>
        {!isPremium && remainingGenerations !== null && (
          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            ⚡ {remainingGenerations} génération{remainingGenerations !== 1 ? 's' : ''} restante{remainingGenerations !== 1 ? 's' : ''}
          </span>
        )}
        {isPremium && (
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
            ⭐ Premium - Illimité
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">Décris ce que tu veux, je génère le code React/Tailwind pour toi !</p>
      
      {/* Bannière pour utilisateurs gratuits */}
      {!isPremium && isSignedIn && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-700">
          💡 Version gratuite : 10 générations par jour. 
          <Link href="/pricing" className="ml-1 underline font-semibold">Passe à Premium</Link> pour un accès illimité.
        </div>
      )}
      
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setType('component')} 
          className={`px-4 py-2 rounded-lg transition ${type === 'component' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          ⚛️ Composant
        </button>
        <button 
          onClick={() => setType('section')} 
          className={`px-4 py-2 rounded-lg transition ${type === 'section' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          🧩 Section
        </button>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ex: 'Crée une carte de présentation pour une agence digitale avec une image, un titre et un bouton'"
        className="w-full p-3 border rounded-lg h-32 mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />

      <button 
        onClick={handleGenerate} 
        disabled={loading || !prompt.trim()} 
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
      >
        {loading ? 'Génération...' : '🚀 Générer le code'}
      </button>

      {generatedCode && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Code généré :</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm max-h-96">
            <code>{generatedCode}</code>
          </pre>
          <button 
            onClick={() => navigator.clipboard.writeText(generatedCode)} 
            className="mt-2 text-purple-600 text-sm hover:underline"
          >
            📋 Copier le code
          </button>
        </div>
      )}
    </div>
  );
}