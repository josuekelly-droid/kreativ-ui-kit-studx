"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/builder", label: "Builder" },
    { href: "/pricing", label: "Tarifs" },
    { href: "/docs", label: "Docs" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: "rgba(255,255,255,0.95)", borderBottomColor: "#e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎨 Kreativ UI
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-purple-600 ${
                  pathname === link.href ? "text-purple-600 font-semibold" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:block">Mon compte</span>
                <UserButton />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t py-2 px-4 flex gap-4 overflow-x-auto" style={{ background: "rgba(255,255,255,0.95)" }}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm whitespace-nowrap transition-colors ${
              pathname === link.href ? "text-purple-600 font-semibold" : "text-gray-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}