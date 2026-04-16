"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-gray-600 mb-8">
        Une question ? Un problème ? N'hésitez pas à nous contacter. Nous vous répondrons dans les meilleurs délais.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Formulaire */}
        <div>
          {status === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
              <p className="text-green-700 font-semibold">✅ Message envoyé !</p>
              <p className="text-green-600 text-sm mt-2">Nous vous répondrons rapidement.</p>
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-6">
              <p className="text-red-700 font-semibold">❌ Erreur</p>
              <p className="text-red-600 text-sm mt-2">{errorMsg || "Réessayez plus tard."}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Nom complet</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Jean Dupont"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="jean@exemple.com"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Votre message..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>

        {/* Infos contact */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Autres moyens de nous contacter</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:kelly.webnux@gmail.com" className="text-purple-600 hover:underline">
                  kelly.webnux@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐦</span>
              <div>
                <p className="font-semibold">Twitter / X</p>
                <a href="#" className="text-purple-600 hover:underline">@kreativui</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold">Discord</p>
                <a href="#" className="text-purple-600 hover:underline">/kreativ-ui</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐙</span>
              <div>
                <p className="font-semibold">GitHub</p>
                <a href="#" className="text-purple-600 hover:underline">github.com/kreativ-ui</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}