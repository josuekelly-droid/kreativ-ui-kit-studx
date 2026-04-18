"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  link: string;
  createdAt: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/builder", label: "Builder" },
    // { href: "/pricing", label: "Tarifs" },
    { href: "/docs", label: "Docs" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/community", label: "Communauté" },
  ];

  const fetchNotifications = async () => {
    if (!isSignedIn) return;
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Erreur chargement notifications:", error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isSignedIn]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: "rgba(255,255,255,0.95)", borderBottomColor: "#e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎨 Kreativ UI Kit
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
            {/* 🔔 Notifications */}
            {isSignedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-purple-600 transition rounded-full hover:bg-purple-50"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown notifications */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                    <div className="p-3 border-b flex justify-between items-center">
                      <span className="font-semibold">Notifications</span>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-purple-600 hover:underline">
                          Tout marquer comme lu
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          Aucune notification
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <Link
                            key={notif.id}
                            href={notif.link}
                            onClick={() => {
                              markAsRead(notif.id);
                              setShowNotifications(false);
                            }}
                            className={`block p-3 border-b hover:bg-purple-50 transition ${
                              notif.read ? "opacity-70" : "bg-purple-50/50"
                            }`}
                          >
                            <p className="text-sm text-gray-700">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notif.createdAt).toLocaleDateString()} à {new Date(notif.createdAt).toLocaleTimeString()}
                            </p>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

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