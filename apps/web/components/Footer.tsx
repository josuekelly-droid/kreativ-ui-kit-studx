"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto" style={{ background: "#f9fafb", borderTopColor: "#e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Colonne 1 - Marque */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎨</span> Kreativ UI
            </h3>
            <p className="text-sm text-gray-600">
              Le générateur de design system ultime pour designers et développeurs.
            </p>
          </div>

          {/* Colonne 2 - Produit */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Produit</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/builder" className="hover:text-purple-600 transition">ThemeBuilder</Link></li>
              <li><Link href="/pricing" className="hover:text-purple-600 transition">Tarifs</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-600 transition">Dashboard</Link></li>
              <li><Link href="/docs" className="hover:text-purple-600 transition">Documentation</Link></li>
            </ul>
          </div>

          {/* Colonne 3 - Ressources */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition">Blog</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">Support</a></li>
              <li><a href="#" className="hover:text-purple-600 transition">API</a></li>
              <li><Link href="/contact" className="hover:text-purple-600 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 4 - Légal & Social */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/legal/terms" className="hover:text-purple-600 transition">Conditions d'utilisation</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-purple-600 transition">Confidentialité</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-purple-600 transition">Cookies</Link></li>
            </ul>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">🐦</a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">💬</a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">📧</a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition">🐙</a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} Kreativ UI Kit Pro. Tous droits réservés.</p>
          <p className="mt-2">
            Créé par{" "}
            <a 
              href="https://www.linkedin.com/in/kellyjosueakplogan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition"
            >
              Kelly Josué AKPLOGAN
            </a>
            {" • "}
            <a 
              href="https://kreativ-ux.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition"
            >
              Agence Kreativ UX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}