"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function AIGenerator() {
  const { isSignedIn } = useUser();
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('component');

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
      <h2 className="text-2xl font-bold mb-4">✨ Assistant IA Premium</h2>
      <p className="text-gray-600 mb-4">Décris ce que tu veux, je génère le code React/Tailwind pour toi !</p>
      
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