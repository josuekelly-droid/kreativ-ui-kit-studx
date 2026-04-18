"use client";

import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import * as Icons from 'lucide-react';
import { UserButton, useUser } from "@clerk/nextjs";
import { usePremium } from "../hooks/usePremium";
import Link from "next/link";

// ============================================================
// COMPOSANTS EXTERNES
// ============================================================

const TabsComponent = ({ primaryColor, borderRadius, surfaceColor, textColor }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Design', 'Développement', 'Marketing'];
  return (
    <div className="w-full">
      <div className="flex gap-2 border-b flex-wrap" style={{ borderBottomColor: `${primaryColor}40` }}>
        {tabs.map((tab, idx) => (
          <button key={idx} onClick={() => setActiveTab(idx)} className="px-6 py-3 font-semibold transition-all duration-300" style={{ backgroundColor: activeTab === idx ? primaryColor : 'transparent', color: activeTab === idx ? 'white' : textColor, borderRadius: `${borderRadius}px ${borderRadius}px 0 0` }}>{tab}</button>
        ))}
      </div>
      <div className="p-8 mt-4 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: `${surfaceColor}cc`, borderRadius: `${borderRadius}px` }}><p style={{ color: textColor }}>Contenu de l'onglet {activeTab + 1}</p></div>
    </div>
  );
};

const AccordionComponent = ({ primaryColor, borderRadius, surfaceColor, textColor, textSecondary }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { title: "Comment ça fonctionne ?", content: "Notre plateforme utilise les dernières technologies pour vous offrir une expérience fluide." },
    { title: "Quels sont les avantages ?", content: "Gagnez du temps, augmentez votre productivité et créez des designs cohérents." },
    { title: "Est-ce compatible ?", content: "Oui, avec React, Next.js, Tailwind CSS et plus encore." }
  ];
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="overflow-hidden transition-all duration-300" style={{ borderRadius: `${borderRadius}px` }}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-6 py-4 text-left font-semibold transition-all duration-300 flex justify-between items-center" style={{ backgroundColor: surfaceColor, color: textColor, borderRadius: `${borderRadius}px` }}>
            <span>{item.title}</span><span className="text-2xl transition-transform duration-300" style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none' }}>▼</span>
          </button>
          {openIndex === i && <div className="px-6 py-4 mt-1 transition-all duration-300" style={{ backgroundColor: `${primaryColor}10`, borderRadius: `${borderRadius}px`, color: textSecondary }}>{item.content}</div>}
        </div>
      ))}
    </div>
  );
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function ThemeBuilder() {
  // États
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [secondaryColor, setSecondaryColor] = useState('#ec4899');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [borderRadius, setBorderRadius] = useState(20);
  const [darkMode, setDarkMode] = useState(false);
  const [spacing, setSpacing] = useState(4);
  const [fontSize, setFontSize] = useState(16);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('components');
  const [selectedIcon, setSelectedIcon] = useState('Heart');
  const [iconSize, setIconSize] = useState(48);
  const [formType, setFormType] = useState('login');
  const [templateType, setTemplateType] = useState('hero');
  const [searchIcon, setSearchIcon] = useState('');

  const { isSignedIn, user } = useUser();
  const { isPremium, loading: premiumLoading } = usePremium();

  // Partager le thème dans la communauté
const shareThemeToCommunity = async () => {
  if (!isSignedIn) {
    alert("Connectez-vous pour partager un thème");
    return;
  }

  const title = prompt("Titre de votre publication", `Mon thème ${new Date().toLocaleDateString()}`);
  if (!title) return;

  const content = `🎨 **Thème personnalisé**\n\n• Couleur primaire : ${primaryColor}\n• Couleur secondaire : ${secondaryColor}\n• Border-radius : ${borderRadius}px\n• Mode sombre : ${darkMode ? "Activé" : "Désactivé"}\n• Espacement : ${spacing * 4}px\n• Taille police : ${fontSize}px\n\nCréé avec Kreativ UI Kit Pro ✨`;

  try {
    const res = await fetch("/api/community/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        type: "share",
      }),
    });
    if (res.ok) {
      alert("✅ Thème partagé dans la communauté !");
      window.open("/community", "_blank");
    } else {
      alert("❌ Erreur lors du partage");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur réseau");
  }
};

  // ========== LISTES POUR RESTRICTIONS PREMIUM ==========
  const ALL_FORMS = [
    'login', 'register', 'contact', 'newsletter', 'feedback', 'checkout', 'search', 'appointment',
    'survey', 'forgotPassword', 'upload', 'profile', 'settings', 'billing', 'shipping', 'review',
    'comment', 'support', 'booking', 'rsvp', 'poll', 'quiz', 'application', 'order', 'refund',
    'warranty', 'claim', 'donation', 'petition', 'invitation', 'registration', 'verification',
    'confirmation', 'cancellation', 'reschedule', 'report', 'complaint', 'suggestion', 'evaluation',
    'assessment', 'test', 'exam'
  ];
  const FREE_FORMS = ALL_FORMS.slice(0, 5);
  const displayForms = isPremium ? ALL_FORMS : FREE_FORMS;

  const ALL_SECTIONS = [
    'hero', 'heroSplit', 'heroVideo', 'heroImage', 'features', 'featuresGrid', 'featuresList',
    'featuresIcons', 'testimonials', 'testimonialsGrid', 'pricing', 'pricingToggle', 'pricingComparison',
    'contact', 'contactMap', 'contactForm', 'footer', 'footerSimple', 'footerColumns', 'footerNewsletter',
    'stats', 'statsWithIcons', 'statsWithProgress', 'cta', 'ctaCenter', 'ctaSplit', 'ctaBackground',
    'blog', 'blogGrid', 'blogList', 'blogFeatured', 'team', 'teamGrid', 'teamList', 'teamCarousel',
    'gallery', 'galleryGrid', 'galleryMasonry', 'gallerySlider', 'faq', 'faqAccordion', 'faqGrid',
    'newsletterSection', 'logoCloud', 'logoCloudSlider', 'security', 'trust', 'partners', 'awards',
    'recognition', 'tabs', 'accordion', 'timeline'
  ];
  const FREE_SECTIONS = ALL_SECTIONS.slice(0, 5);
  const displaySections = isPremium ? ALL_SECTIONS : FREE_SECTIONS;

  // Sauvegarde du thème dans la base de données
  const saveThemeToCloud = async () => {
    if (!isSignedIn) {
      alert("Veuillez vous connecter pour sauvegarder vos thèmes dans le cloud.");
      return;
    }

    try {
      const response = await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Thème ${new Date().toLocaleString()}`,
          primaryColor,
          secondaryColor,
          accentColor,
          borderRadius,
          darkMode,
          spacing,
          fontSize,
        }),
      });

      if (response.ok) {
        alert("✅ Thème sauvegardé dans le cloud !");
        loadUserThemes();
      } else {
        alert("❌ Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
    }
  };

  // Chargement des thèmes de l'utilisateur
  const [userThemes, setUserThemes] = useState<any[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState("");

  const loadUserThemes = async () => {
    if (!isSignedIn) return;

    try {
      const response = await fetch("/api/themes");
      if (response.ok) {
        const themes = await response.json();
        setUserThemes(themes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Chargement d'un thème spécifique
  const loadThemeFromCloud = async (themeId: string) => {
    try {
      const response = await fetch(`/api/themes/${themeId}`);
      if (response.ok) {
        const theme = await response.json();
        setPrimaryColor(theme.primaryColor);
        setSecondaryColor(theme.secondaryColor);
        setAccentColor(theme.accentColor);
        setBorderRadius(theme.borderRadius);
        setDarkMode(theme.darkMode);
        setSpacing(theme.spacing);
        setFontSize(theme.fontSize);
        alert(`✅ Thème "${theme.name}" chargé !`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Charger les thèmes au démarrage si connecté
  useEffect(() => {
    if (isSignedIn) {
      loadUserThemes();
    }
  }, [isSignedIn]);

  // Chargement
  useEffect(() => {
    const saved = localStorage.getItem('kreativ-theme');
    if (saved) {
      try {
        const theme = JSON.parse(saved);
        setPrimaryColor(theme.primaryColor || '#8b5cf6');
        setSecondaryColor(theme.secondaryColor || '#ec4899');
        setAccentColor(theme.accentColor || '#10b981');
        setBorderRadius(theme.borderRadius || 20);
        setDarkMode(theme.darkMode || false);
        setSpacing(theme.spacing || 4);
        setFontSize(theme.fontSize || 16);
      } catch (error) {}
    }
  }, []);

  const theme = { primaryColor, secondaryColor, accentColor, borderRadius: `${borderRadius}px`, spacing: `${spacing * 4}px`, fontSize: `${fontSize}px` };
  const bgColor = darkMode ? '#0a0a0a' : '#f0f4f8';
  const surfaceColor = darkMode ? 'rgba(30, 30, 35, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const textColor = darkMode ? '#ffffff' : '#1a1a2e';
  const textSecondary = darkMode ? '#a0a0b0' : '#6c6c7a';

  const saveTheme = () => {
    localStorage.setItem('kreativ-theme', JSON.stringify({ primaryColor, secondaryColor, accentColor, borderRadius, darkMode, spacing, fontSize }));
    alert('✅ Thème sauvegardé !');
  };
  const loadTheme = () => {
    const saved = localStorage.getItem('kreativ-theme');
    if (saved) {
      const t = JSON.parse(saved);
      setPrimaryColor(t.primaryColor);
      setSecondaryColor(t.secondaryColor);
      setAccentColor(t.accentColor);
      setBorderRadius(t.borderRadius);
      setDarkMode(t.darkMode);
      setSpacing(t.spacing);
      setFontSize(t.fontSize);
      alert('📂 Thème chargé !');
    }
  };
  const exportTheme = () => {
    const data = { primaryColor, secondaryColor, accentColor, borderRadius, darkMode, spacing, fontSize };
    let content = '', filename = '';
    if (exportFormat === 'json') { content = JSON.stringify(data, null, 2); filename = 'kreativ-theme.json'; }
    else if (exportFormat === 'css') { content = `:root { --primary: ${primaryColor}; --secondary: ${secondaryColor}; --radius: ${borderRadius}px; }`; filename = 'kreativ-theme.css'; }
    else { content = `module.exports = { theme: { extend: { colors: { primary: '${primaryColor}', secondary: '${secondaryColor}' }, borderRadius: { theme: '${borderRadius}px' } } } }`; filename = 'tailwind.config.js'; }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  // Enregistrement des téléchargements en base de données
  const saveDownloadToDatabase = async (type: string, name: string, format: string) => {
    if (!isSignedIn) return;
    try {
      await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, format }),
      });
    } catch (error) {
      console.error("Erreur enregistrement téléchargement:", error);
    }
  };
  
  const downloadCode = (type: string, name: string, format: string, content: string) => {
    // Enregistrer le téléchargement en base
    saveDownloadToDatabase(type, name, format);
    
    let finalContent = '', extension = '';
    if (format === 'html') {
      finalContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kreativ - ${name}</title><style>:root{--primary:${primaryColor};--radius:${borderRadius}px;--bg:${bgColor}}body{background:var(--bg);font-family:system-ui;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px}.btn{background:var(--primary);border-radius:var(--radius);padding:12px 28px;color:white;border:none;cursor:pointer;transition:all 0.3s ease}.btn:hover{transform:scale(1.05)}</style></head><body>${content}</body></html>`;
      extension = 'html';
    } else if (format === 'react') {
      finalContent = `import React from 'react';\n\nconst ${name.charAt(0).toUpperCase() + name.slice(1)} = () => {\n  const primaryColor = '${primaryColor}';\n  const borderRadius = ${borderRadius};\n\n  return (\n    <div style={{ padding: '20px' }}>\n      ${content.replace(/class="/g, 'className="')}\n    </div>\n  );\n};\n\nexport default ${name.charAt(0).toUpperCase() + name.slice(1)};`;
      extension = 'jsx';
    } else {
      finalContent = `<div class="p-8 rounded-2xl shadow-2xl backdrop-blur-sm" style="background: ${surfaceColor}">${content}</div>`;
      extension = 'html';
    }
    const blob = new Blob([finalContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kreativ-${type}-${name}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ============================================================
  // 1. ICÔNES (100+)
  // ============================================================
  const ICON_LIST = [
    'Heart', 'Star', 'User', 'Settings', 'Home', 'Mail', 'Phone', 'Camera', 'Music', 'Video',
    'Bell', 'Bookmark', 'Calendar', 'Check', 'Clock', 'Cloud', 'Code', 'Coffee', 'Compass', 'Copy',
    'CreditCard', 'Database', 'Download', 'Edit', 'Eye', 'File', 'Film', 'Filter', 'Flag', 'Folder',
    'Gift', 'Globe', 'Headphones', 'Image', 'Key', 'Layers', 'Layout', 'Link', 'List', 'Lock',
    'LogIn', 'LogOut', 'Map', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Minus', 'Monitor', 'Moon',
    'MoreHorizontal', 'MoreVertical', 'Move', 'Package', 'Paperclip', 'Pause', 'PenTool', 'Play', 'Plus', 'Power',
    'Printer', 'Radio', 'RefreshCw', 'Repeat', 'Rss', 'Save', 'Search', 'Send', 'Server', 'Share',
    'Shield', 'ShoppingBag', 'ShoppingCart', 'Shuffle', 'Sidebar', 'SkipBack', 'SkipForward', 'Smartphone', 'Smile', 'Speaker',
    'StopCircle', 'Sun', 'Sunrise', 'Sunset', 'Tablet', 'Tag', 'Target', 'Terminal', 'ThumbsUp', 'ThumbsDown',
    'Ticket', 'ToggleLeft', 'ToggleRight', 'Tool', 'Trash', 'TrendingUp', 'TrendingDown', 'Truck', 'Tv', 'Type',
    'Umbrella', 'Underline', 'Unlock', 'Upload', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Volume1', 'Volume2',
    'VolumeX', 'Wallet', 'Watch', 'Wifi', 'Wind', 'X', 'XCircle', 'Zap', 'ZoomIn', 'ZoomOut'
  ];
  const filteredIcons = ICON_LIST.filter(icon => icon.toLowerCase().includes(searchIcon.toLowerCase()));
  const IconComponent = (Icons as any)[selectedIcon] || Icons.Heart;

  // ============================================================
  // 2. FORMULAIRES (40+)
  // ============================================================
  const getFormHTML = (type: string): string => {
    const baseInputStyle = `width:100%; padding:14px 18px; margin-bottom:16px; border:2px solid ${primaryColor}30; border-radius:${borderRadius}px; background:${darkMode ? '#1a1a1a' : '#ffffff'}; color:${textColor}; font-size:16px; transition:all 0.3s ease; outline:none`;
    const baseButtonStyle = `width:100%; padding:14px; background:linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); border:none; border-radius:${borderRadius}px; color:white; font-weight:bold; font-size:16px; cursor:pointer; transition:all 0.3s ease`;
    
    switch(type) {
      case 'login': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🔐</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Connexion</h2><input type="email" placeholder="Email" style="${baseInputStyle}"><input type="password" placeholder="Mot de passe" style="${baseInputStyle}"><button style="${baseButtonStyle}">Se connecter</button></div>`;
      case 'register': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📝</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Inscription</h2><input type="text" placeholder="Nom complet" style="${baseInputStyle}"><input type="email" placeholder="Email" style="${baseInputStyle}"><input type="password" placeholder="Mot de passe" style="${baseInputStyle}"><button style="${baseButtonStyle}">S'inscrire</button></div>`;
      case 'contact': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📧</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Contact</h2><input type="text" placeholder="Nom" style="${baseInputStyle}"><input type="email" placeholder="Email" style="${baseInputStyle}"><textarea rows="4" placeholder="Message" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Envoyer</button></div>`;
      case 'newsletter': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📰</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:16px">Newsletter</h2><p style="margin-bottom:24px;opacity:0.7">Recevez nos actualités</p><input type="email" placeholder="Votre email" style="${baseInputStyle}"><button style="${baseButtonStyle}">S'abonner</button></div>`;
      case 'feedback': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💬</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Feedback</h2><select style="${baseInputStyle}"><option>⭐⭐⭐⭐⭐ Excellent</option><option>⭐⭐⭐⭐ Très bien</option><option>⭐⭐⭐ Bien</option><option>⭐⭐ Moyen</option><option>⭐ À améliorer</option></select><textarea rows="3" placeholder="Votre avis" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Envoyer</button></div>`;
      case 'checkout': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💳</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Paiement</h2><input type="text" placeholder="Numéro de carte" style="${baseInputStyle}"><div style="display:flex;gap:12px"><input type="text" placeholder="MM/AA" style="flex:1;${baseInputStyle}"><input type="text" placeholder="CVV" style="flex:1;${baseInputStyle}"></div><button style="${baseButtonStyle}">Payer</button></div>`;
      case 'search': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🔍</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Recherche</h2><div style="display:flex;gap:12px"><input type="text" placeholder="Rechercher..." style="flex:1;${baseInputStyle}"><button style="width:auto;padding:14px 28px;background:linear-gradient(135deg, ${primaryColor}, ${secondaryColor});border:none;border-radius:${borderRadius}px;color:white;font-weight:bold;cursor:pointer">Go</button></div></div>`;
      case 'appointment': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📅</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Rendez-vous</h2><input type="date" style="${baseInputStyle}"><input type="time" style="${baseInputStyle}"><button style="${baseButtonStyle}">Réserver</button></div>`;
      case 'survey': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📊</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Sondage</h2><p style="margin-bottom:16px">Comment trouvez-vous notre service ?</p><label style="display:block;margin-bottom:8px"><input type="radio" name="survey_${Date.now()}"> Excellent</label><label style="display:block;margin-bottom:8px"><input type="radio" name="survey_${Date.now()}"> Bon</label><label style="display:block;margin-bottom:8px"><input type="radio" name="survey_${Date.now()}"> Moyen</label><button style="${baseButtonStyle};margin-top:20px">Voter</button></div>`;
      case 'forgotPassword': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🔑</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Mot de passe oublié</h2><input type="email" placeholder="Votre email" style="${baseInputStyle}"><button style="${baseButtonStyle}">Réinitialiser</button></div>`;
      case 'upload': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📁</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Upload</h2><div style="border:2px dashed ${primaryColor};border-radius:${borderRadius}px;padding:40px;margin-bottom:20px"><p>Glissez-déposez ou cliquez</p></div><button style="${baseButtonStyle}">Uploader</button></div>`;
      case 'profile': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">👤</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Profil</h2><input type="text" placeholder="Nom" style="${baseInputStyle}"><input type="email" placeholder="Email" style="${baseInputStyle}"><input type="tel" placeholder="Téléphone" style="${baseInputStyle}"><button style="${baseButtonStyle}">Mettre à jour</button></div>`;
      case 'settings': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">⚙️</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Paramètres</h2><label style="display:block;margin-bottom:12px"><input type="checkbox"> Notifications email</label><label style="display:block;margin-bottom:12px"><input type="checkbox"> Mode sombre</label><button style="${baseButtonStyle};margin-top:20px">Enregistrer</button></div>`;
      case 'billing': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💰</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Facturation</h2><input type="text" placeholder="Adresse" style="${baseInputStyle}"><input type="text" placeholder="Ville" style="${baseInputStyle}"><input type="text" placeholder="Code postal" style="${baseInputStyle}"><button style="${baseButtonStyle}">Enregistrer</button></div>`;
      case 'shipping': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🚚</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Livraison</h2><input type="text" placeholder="Adresse" style="${baseInputStyle}"><input type="text" placeholder="Complément" style="${baseInputStyle}"><select style="${baseInputStyle}"><option>Standard (3-5j)</option><option>Express (1-2j)</option></select><button style="${baseButtonStyle}">Continuer</button></div>`;
      case 'review': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">⭐</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Avis</h2><div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px">${'⭐'.repeat(5)}</div><textarea rows="3" placeholder="Votre avis" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Publier</button></div>`;
      case 'comment': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💬</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Commentaire</h2><textarea rows="3" placeholder="Votre commentaire" style="${baseInputStyle}"></textarea><input type="text" placeholder="Votre nom" style="${baseInputStyle}"><button style="${baseButtonStyle}">Commenter</button></div>`;
      case 'support': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🛡️</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Support</h2><input type="text" placeholder="Sujet" style="${baseInputStyle}"><textarea rows="4" placeholder="Description" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Envoyer</button></div>`;
      case 'booking': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📅</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Réservation</h2><input type="date" style="${baseInputStyle}"><input type="time" style="${baseInputStyle}"><select style="${baseInputStyle}"><option>1 personne</option><option>2 personnes</option><option>3 personnes</option><option>4 personnes</option></select><button style="${baseButtonStyle}">Réserver</button></div>`;
      case 'rsvp': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🎉</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">RSVP</h2><p>Serez-vous présent ?</p><div style="display:flex;gap:12px;margin:20px 0"><button style="flex:1;padding:12px;background:${primaryColor};border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">Oui</button><button style="flex:1;padding:12px;background:#6c757d;border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">Non</button></div><input type="text" placeholder="Nombre d'invités" style="${baseInputStyle}"><button style="${baseButtonStyle}">Confirmer</button></div>`;
      case 'poll': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📊</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Sondage</h2><p>Quel est votre langage préféré ?</p><label style="display:block"><input type="radio" name="poll"> React</label><label style="display:block"><input type="radio" name="poll"> Vue</label><label style="display:block"><input type="radio" name="poll"> Angular</label><button style="${baseButtonStyle};margin-top:20px">Voter</button></div>`;
      case 'quiz': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">❓</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Quiz</h2><p>Quelle est la capitale de la France ?</p><input type="text" placeholder="Réponse" style="${baseInputStyle}"><button style="${baseButtonStyle}">Suivant</button></div>`;
      case 'application': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📝</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Candidature</h2><input type="text" placeholder="Nom" style="${baseInputStyle}"><input type="email" placeholder="Email" style="${baseInputStyle}"><input type="file" style="${baseInputStyle}"><button style="${baseButtonStyle}">Postuler</button></div>`;
      case 'order': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📦</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Commande</h2><select style="${baseInputStyle}"><option>Produit A - 29€</option><option>Produit B - 49€</option><option>Produit C - 99€</option></select><input type="number" placeholder="Quantité" style="${baseInputStyle}"><button style="${baseButtonStyle}">Commander</button></div>`;
      case 'refund': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💰</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Remboursement</h2><input type="text" placeholder="N° commande" style="${baseInputStyle}"><textarea rows="3" placeholder="Raison" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Demander</button></div>`;
      case 'warranty': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">🛡️</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Garantie</h2><input type="text" placeholder="N° produit" style="${baseInputStyle}"><input type="date" style="${baseInputStyle}"><button style="${baseButtonStyle}">Vérifier</button></div>`;
      case 'claim': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">⚠️</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Réclamation</h2><input type="text" placeholder="Sujet" style="${baseInputStyle}"><textarea rows="4" placeholder="Description" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Soumettre</button></div>`;
      case 'donation': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">❤️</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Don</h2><div style="display:flex;gap:8px;margin-bottom:20px"><button style="flex:1;padding:12px;background:${primaryColor};border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">10€</button><button style="flex:1;padding:12px;background:#6c757d;border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">20€</button><button style="flex:1;padding:12px;background:#6c757d;border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">50€</button></div><input type="text" placeholder="Montant" style="${baseInputStyle}"><button style="${baseButtonStyle}">Donner</button></div>`;
      case 'petition': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📜</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Pétition</h2><p>Soutenez notre cause</p><input type="text" placeholder="Nom" style="${baseInputStyle}"><input type="email" placeholder="Email" style="${baseInputStyle}"><button style="${baseButtonStyle}">Signer</button></div>`;
      case 'invitation': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💌</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Invitation</h2><p>Vous êtes invité(e)</p><div style="display:flex;gap:12px;margin:20px 0"><button style="flex:1;padding:12px;background:${primaryColor};border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">Accepter</button><button style="flex:1;padding:12px;background:#6c757d;border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">Décliner</button></div><button style="${baseButtonStyle}">Plus d'infos</button></div>`;
      case 'registration': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📝</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Enregistrement</h2><input type="text" placeholder="Nom" style="${baseInputStyle}"><input type="email" placeholder="Email" style="${baseInputStyle}"><input type="tel" placeholder="Téléphone" style="${baseInputStyle}"><button style="${baseButtonStyle}">S'enregistrer</button></div>`;
      case 'verification': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">✅</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Vérification</h2><p>Code à 6 chiffres</p><input type="text" placeholder="Code" style="${baseInputStyle}"><button style="${baseButtonStyle}">Vérifier</button></div>`;
      case 'confirmation': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">✔️</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Confirmation</h2><p>Votre réservation est confirmée</p><button style="${baseButtonStyle}">Voir détails</button></div>`;
      case 'cancellation': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">❌</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Annulation</h2><p>Annuler ?</p><div style="display:flex;gap:12px;margin:20px 0"><button style="flex:1;padding:12px;background:#dc2626;border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">Annuler</button><button style="flex:1;padding:12px;background:#6c757d;border:none;border-radius:${borderRadius}px;color:white;cursor:pointer">Retour</button></div></div>`;
      case 'reschedule': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📅</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Report</h2><input type="date" style="${baseInputStyle}"><input type="time" style="${baseInputStyle}"><button style="${baseButtonStyle}">Reporter</button></div>`;
      case 'report': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📊</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Rapport</h2><input type="text" placeholder="Type" style="${baseInputStyle}"><input type="date" style="${baseInputStyle}"><button style="${baseButtonStyle}">Générer</button></div>`;
      case 'complaint': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📢</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Réclamation</h2><textarea rows="4" placeholder="Description" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Envoyer</button></div>`;
      case 'suggestion': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">💡</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Suggestion</h2><textarea rows="3" placeholder="Idée" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Proposer</button></div>`;
      case 'evaluation': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📝</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Évaluation</h2><div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px">${'⭐'.repeat(5)}</div><textarea rows="2" placeholder="Commentaire" style="${baseInputStyle}"></textarea><button style="${baseButtonStyle}">Évaluer</button></div>`;
      case 'assessment': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📊</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Assessment</h2><div style="margin-bottom:12px"><p>Question 1 ?</p><select style="${baseInputStyle}"><option>Très satisfait</option><option>Satisfait</option><option>Neutre</option><option>Insatisfait</option></select></div><button style="${baseButtonStyle}">Soumettre</button></div>`;
      case 'test': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📝</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Test</h2><p>React est une bibliothèque ?</p><label><input type="radio" name="test"> Vrai</label><label style="margin-left:16px"><input type="radio" name="test"> Faux</label><button style="${baseButtonStyle};margin-top:20px">Suivant</button></div>`;
      case 'exam': return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">📚</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Examen</h2><p>Temps restant : 30:00</p><input type="text" placeholder="Réponse" style="${baseInputStyle}"><button style="${baseButtonStyle}">Soumettre</button></div>`;
      default: return `<div style="text-align:center"><div style="font-size:48px;margin-bottom:20px">✨</div><h2 style="font-size:28px;font-weight:bold;margin-bottom:24px">Formulaire ${type}</h2><p>Contenu personnalisable</p></div>`;
    }
  };

  const renderForm = () => {
    const content = getFormHTML(formType);
    return (
      <div className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500" style={{ background: `${surfaceColor}`, backdropFilter: 'blur(10px)', borderRadius: `${borderRadius}px` }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="flex gap-3 justify-center mt-6 pt-4 border-t" style={{ borderTopColor: `${primaryColor}20` }}>
          {isPremium ? (
            <>
              <button onClick={() => downloadCode('form', formType, 'html', content)} className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>📄 HTML</button>
              <button onClick={() => downloadCode('form', formType, 'react', content)} className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>⚛️ React</button>
              <button onClick={() => downloadCode('form', formType, 'tailwind', content)} className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>🎨 Tailwind</button>
            </>
          ) : (
            <div className="text-center w-full">
              <p className="text-sm text-yellow-600">🔒 Téléchargements réservés aux utilisateurs Premium</p>
              <Link href="/pricing" className="text-xs text-purple-600 underline">Passer Premium</Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // 3. SECTIONS (50+)
  // ============================================================
  const getSectionHTML = (type: string): string => {
    const gradientBg = `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`;
    switch(type) {
      case 'hero': return `<div style="text-align:center;padding:100px 20px;background:${gradientBg};border-radius:${borderRadius}px"><div style="max-width:800px;margin:0 auto"><div style="font-size:64px;margin-bottom:24px">🎨</div><h1 style="font-size:56px;font-weight:bold;margin-bottom:20px;background:linear-gradient(135deg, ${primaryColor}, ${secondaryColor});-webkit-background-clip:text;-webkit-text-fill-color:transparent">Kreativ UI Kit</h1><p style="font-size:20px;margin-bottom:32px;opacity:0.8">Créez des interfaces exceptionnelles</p><div style="display:flex;gap:16px;justify-content:center"><button class="btn" style="background:${primaryColor}">Commencer</button><button style="padding:12px 28px;border-radius:${borderRadius}px;border:2px solid ${primaryColor};background:transparent;color:${textColor};font-weight:bold;cursor:pointer">En savoir plus</button></div></div></div>`;
      case 'heroSplit': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;padding:80px 20px;align-items:center"><div><h1 style="font-size:48px;font-weight:bold;margin-bottom:20px">Titre à gauche</h1><p style="margin-bottom:24px;opacity:0.7">Description avec appel à l'action</p><button class="btn" style="background:${primaryColor}">Commencer</button></div><div style="background:${primaryColor}20;border-radius:${borderRadius}px;padding:60px;text-align:center"><span style="font-size:64px">🎨</span></div></div>`;
      case 'heroVideo': return `<div style="text-align:center;padding:80px 20px;background:${gradientBg};border-radius:${borderRadius}px"><h1 style="font-size:48px;font-weight:bold;margin-bottom:20px">Vidéo de présentation</h1><div style="background:#000;border-radius:${borderRadius}px;padding:80px;margin:20px auto;max-width:600px;cursor:pointer"><span style="font-size:64px">▶️</span></div><button class="btn" style="background:${primaryColor}">Regarder</button></div>`;
      case 'heroImage': return `<div style="text-align:center;padding:80px 20px;background:url('https://picsum.photos/1200/400') center/cover;border-radius:${borderRadius}px;color:white"><div style="background:rgba(0,0,0,0.6);padding:60px;border-radius:${borderRadius}px"><h1 style="font-size:48px;font-weight:bold;margin-bottom:20px">Image de fond</h1><p style="margin-bottom:24px">Texte superposé</p><button class="btn" style="background:${primaryColor}">Découvrir</button></div></div>`;
      case 'features': return `<div style="padding:80px 20px;text-align:center"><h2 style="font-size:36px;font-weight:bold;margin-bottom:16px">Fonctionnalités</h2><p style="margin-bottom:48px;opacity:0.7">Tout ce dont vous avez besoin</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px">${[1,2,3,4].map(i => `<div style="padding:32px;background:${surfaceColor};border-radius:${borderRadius}px;box-shadow:0 10px 30px rgba(0,0,0,0.05);text-align:center"><div style="font-size:48px;margin-bottom:20px">✨</div><h3 style="font-size:22px;font-weight:bold;margin-bottom:12px">Fonctionnalité ${i}</h3><p style="opacity:0.7">Description détaillée</p></div>`).join('')}</div></div>`;
      case 'featuresGrid': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;padding:60px 20px">${[1,2,3,4,5,6].map(i => `<div style="text-align:center;padding:32px;background:${surfaceColor};border-radius:${borderRadius}px"><div style="font-size:40px;margin-bottom:12px">⚡</div><h3>Feature ${i}</h3></div>`).join('')}</div>`;
      case 'featuresList': return `<div style="max-width:600px;margin:0 auto;padding:60px 20px"><h2 style="text-align:center;margin-bottom:32px">Fonctionnalités clés</h2>${['Rapide', 'Sécurisé', 'Fiable', 'Moderne', 'Responsive'].map(f => `<div style="display:flex;align-items:center;gap:16px;padding:16px;border-bottom:1px solid ${primaryColor}30"><span style="color:${primaryColor};font-size:24px">✓</span><span>${f}</span></div>`).join('')}</div>`;
      case 'featuresIcons': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:32px;text-align:center;padding:60px 20px"><div><div style="font-size:48px;color:${primaryColor};margin-bottom:12px">⚡</div><h3>Rapide</h3></div><div><div style="font-size:48px;color:${primaryColor};margin-bottom:12px">🛡️</div><h3>Sécurisé</h3></div><div><div style="font-size:48px;color:${primaryColor};margin-bottom:12px">☁️</div><h3>Cloud</h3></div><div><div style="font-size:48px;color:${primaryColor};margin-bottom:12px">❤️</div><h3>Fiable</h3></div></div>`;
      case 'testimonials': return `<div style="padding:80px 20px;text-align:center"><h2 style="font-size:36px;font-weight:bold;margin-bottom:16px">Témoignages</h2><p style="margin-bottom:48px;opacity:0.7">Ce qu'ils disent de nous</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px">${[1,2,3].map(i => `<div style="padding:32px;background:${surfaceColor};border-radius:${borderRadius}px;box-shadow:0 10px 30px rgba(0,0,0,0.05)"><div style="font-size:64px;margin-bottom:16px">👤</div><p style="font-style:italic;margin-bottom:20px">"Une plateforme exceptionnelle qui a transformé notre façon de travailler."</p><h4 style="font-weight:bold">Client ${i}</h4></div>`).join('')}</div></div>`;
      case 'testimonialsGrid': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;padding:60px 20px;background:${gradientBg}">${[1,2,3,4].map(i => `<div style="padding:32px;background:${surfaceColor};border-radius:${borderRadius}px"><div style="color:${primaryColor};margin-bottom:12px">★★★★★</div><p>Témoignage ${i}</p><p style="margin-top:16px;font-weight:bold">- Client ${i}</p></div>`).join('')}</div>`;
      case 'pricing': return `<div style="padding:80px 20px;text-align:center;background:${gradientBg}"><h2 style="font-size:36px;font-weight:bold;margin-bottom:16px">Tarifs</h2><p style="margin-bottom:48px;opacity:0.7">Choisissez le plan qui vous convient</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;max-width:1200px;margin:0 auto">${['Basic','Pro','Enterprise'].map((plan,i) => `<div style="padding:40px;background:${surfaceColor};border-radius:${borderRadius}px;box-shadow:0 20px 40px rgba(0,0,0,0.1);text-align:center;${i===1 ? `transform:scale(1.05);border:2px solid ${primaryColor}` : ''}"><div style="font-size:48px;margin-bottom:20px">${i===0?'⭐':i===1?'💎':'🏢'}</div><h3 style="font-size:28px;font-weight:bold;margin-bottom:16px">${plan}</h3><p style="font-size:48px;font-weight:bold;color:${primaryColor};margin-bottom:24px">${i===0?'19€':i===1?'49€':'99€'}<span style="font-size:16px">/mois</span></p><button class="btn" style="background:${primaryColor};width:100%">Choisir</button></div>`).join('')}</div></div>`;
      case 'pricingToggle': return `<div style="padding:60px 20px;text-align:center"><div style="display:flex;justify-content:center;gap:16px;margin-bottom:32px"><button style="background:${primaryColor};color:white;border:none;padding:12px 24px;border-radius:${borderRadius}px">Mensuel</button><button style="background:transparent;border:1px solid ${primaryColor};padding:12px 24px;border-radius:${borderRadius}px">Annuel</button></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px">${['Basic','Pro'].map(plan => `<div style="padding:32px;background:${surfaceColor};border-radius:${borderRadius}px"><h3>${plan}</h3><p style="font-size:36px;color:${primaryColor}">29€</p><button class="btn" style="background:${primaryColor};width:100%">Choisir</button></div>`).join('')}</div></div>`;
      case 'pricingComparison': return `<div style="overflow-x:auto;padding:60px 20px"><table style="width:100%;border-collapse:collapse"><thead><tr><th style="padding:12px;text-align:left">Fonctionnalité</th><th style="padding:12px;text-align:center">Basic</th><th style="padding:12px;text-align:center">Pro</th><th style="padding:12px;text-align:center">Enterprise</th></tr></thead><tbody><tr><td style="padding:12px;border-top:1px solid #ddd">Support</td><td style="padding:12px;text-align:center">✓</td><td style="padding:12px;text-align:center">✓</td><td style="padding:12px;text-align:center">✓</td></tr><tr><td style="padding:12px;border-top:1px solid #ddd">API</td><td style="padding:12px;text-align:center">✗</td><td style="padding:12px;text-align:center">✓</td><td style="padding:12px;text-align:center">✓</td></tr></tbody></table></div>`;
      case 'contact': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;padding:80px 20px"><div><h2 style="font-size:32px;font-weight:bold;margin-bottom:20px">Contactez-nous</h2><p style="margin-bottom:12px">Email: contact@kreativ.com</p><p>Tél: +33 1 23 45 67 89</p></div><div><input type="text" placeholder="Nom" style="width:100%;padding:14px;margin-bottom:16px;border:2px solid ${primaryColor}30;border-radius:${borderRadius}px"><input type="email" placeholder="Email" style="width:100%;padding:14px;margin-bottom:16px;border:2px solid ${primaryColor}30;border-radius:${borderRadius}px"><textarea rows="4" placeholder="Message" style="width:100%;padding:14px;margin-bottom:16px;border:2px solid ${primaryColor}30;border-radius:${borderRadius}px"></textarea><button class="btn" style="background:${primaryColor};width:100%">Envoyer</button></div></div>`;
      case 'contactMap': return `<div style="padding:60px 20px"><div style="background:${primaryColor}20;border-radius:${borderRadius}px;padding:100px;text-align:center"><span style="font-size:64px">📍</span><p>Carte interactive</p></div></div>`;
      case 'contactForm': return `<div style="max-width:500px;margin:0 auto;padding:60px 20px"><h2 style="text-align:center;margin-bottom:32px">Contact</h2><input type="text" placeholder="Nom" style="width:100%;padding:14px;margin-bottom:16px;border:2px solid ${primaryColor}30;border-radius:${borderRadius}px"><input type="email" placeholder="Email" style="width:100%;padding:14px;margin-bottom:16px;border:2px solid ${primaryColor}30;border-radius:${borderRadius}px"><textarea rows="4" placeholder="Message" style="width:100%;padding:14px;margin-bottom:16px;border:2px solid ${primaryColor}30;border-radius:${borderRadius}px"></textarea><button class="btn" style="background:${primaryColor};width:100%">Envoyer</button></div>`;
      case 'footer': return `<div style="padding:60px 20px 40px;background:${surfaceColor};border-radius:${borderRadius}px;text-align:center"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;margin-bottom:40px"><div><h3 style="font-weight:bold;margin-bottom:16px">Kreativ UI</h3><p style="opacity:0.7">Le générateur de design system</p></div><div><h3 style="font-weight:bold;margin-bottom:16px">Produit</h3><ul style="list-style:none"><li style="margin-bottom:8px">Fonctionnalités</li><li>Tarifs</li></ul></div><div><h3 style="font-weight:bold;margin-bottom:16px">Entreprise</h3><ul style="list-style:none"><li style="margin-bottom:8px">À propos</li><li>Blog</li></ul></div></div><p style="opacity:0.7">© 2025 Kreativ UI Kit</p></div>`;
      case 'footerSimple': return `<div style="padding:40px 20px;text-align:center;background:${surfaceColor}"><p>© 2025 Kreativ UI. Tous droits réservés.</p></div>`;
      case 'footerColumns': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;padding:60px 20px 40px;background:${surfaceColor}"><div><h3>Produit</h3><ul><li>Fonctions</li><li>Tarifs</li></ul></div><div><h3>Entreprise</h3><ul><li>À propos</li><li>Blog</li></ul></div><div><h3>Légal</h3><ul><li>CGU</li><li>Confidentialité</li></ul></div></div>`;
      case 'footerNewsletter': return `<div style="padding:60px 20px;text-align:center;background:${surfaceColor}"><h3>Newsletter</h3><div style="display:flex;gap:12px;max-width:400px;margin:20px auto"><input type="email" placeholder="Email" style="flex:1;padding:12px;border-radius:${borderRadius}px;border:1px solid ${primaryColor}"><button class="btn" style="background:${primaryColor};padding:12px 24px">OK</button></div></div>`;
      case 'stats': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;padding:80px 20px;text-align:center;background:${gradientBg};border-radius:${borderRadius}px"><div><div style="font-size:48px;margin-bottom:16px">👥</div><h3 style="font-size:48px;font-weight:bold;color:${primaryColor}">10K+</h3><p>Utilisateurs</p></div><div><div style="font-size:48px;margin-bottom:16px">⭐</div><h3 style="font-size:48px;font-weight:bold;color:${primaryColor}">4.9</h3><p>Note moyenne</p></div><div><div style="font-size:48px;margin-bottom:16px">🌍</div><h3 style="font-size:48px;font-weight:bold;color:${primaryColor}">50+</h3><p>Pays</p></div></div>`;
      case 'statsWithIcons': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;text-align:center;padding:80px 20px"><div><span style="font-size:48px">👥</span><h3 style="font-size:48px;color:${primaryColor}">10K+</h3><p>Users</p></div><div><span style="font-size:48px">⬇️</span><h3 style="font-size:48px;color:${primaryColor}">50K+</h3><p>Downloads</p></div><div><span style="font-size:48px">⭐</span><h3 style="font-size:48px;color:${primaryColor}">4.9</h3><p>Rating</p></div></div>`;
      case 'statsWithProgress': return `<div style="padding:60px 20px;max-width:600px;margin:0 auto"><h3>Progression</h3><div style="margin-bottom:20px"><p>Complétion</p><div style="height:8px;background:#e0e0e0;border-radius:4px"><div style="width:75%;height:8px;background:${primaryColor};border-radius:4px"></div></div></div></div>`;
      case 'cta': return `<div style="text-align:center;padding:80px 20px;background:linear-gradient(135deg, ${primaryColor}, ${secondaryColor});border-radius:${borderRadius}px"><h2 style="font-size:36px;font-weight:bold;margin-bottom:16px;color:white">Prêt à commencer ?</h2><p style="margin-bottom:32px;color:white;opacity:0.9">Rejoignez des milliers d'utilisateurs</p><button style="padding:14px 36px;background:white;border:none;border-radius:${borderRadius}px;color:${primaryColor};font-weight:bold;cursor:pointer">Commencer</button></div>`;
      case 'ctaCenter': return `<div style="text-align:center;padding:80px 20px"><h2 style="margin-bottom:20px">Action maintenant</h2><button class="btn" style="background:${primaryColor}">S'inscrire</button></div>`;
      case 'ctaSplit': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:40px;align-items:center;padding:80px 20px;background:${primaryColor}10;border-radius:${borderRadius}px"><div><h2 style="font-size:32px;margin-bottom:16px">Prêt à passer à l'action ?</h2><p>Rejoignez-nous</p></div><div style="text-align:center"><button class="btn" style="background:${primaryColor};padding:16px 32px">Commencer</button></div></div>`;
      case 'ctaBackground': return `<div style="text-align:center;padding:100px 20px;background:url('https://picsum.photos/1200/300') center/cover;color:white"><div style="background:rgba(0,0,0,0.6);padding:60px;border-radius:${borderRadius}px"><h2 style="font-size:36px;margin-bottom:16px">Offre spéciale</h2><button class="btn" style="background:${primaryColor}">Profiter</button></div></div>`;
      case 'blog': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;padding:80px 20px">${[1,2,3].map(i => `<div style="padding:24px;background:${surfaceColor};border-radius:${borderRadius}px;box-shadow:0 10px 30px rgba(0,0,0,0.05)"><div style="height:160px;background:${primaryColor}20;border-radius:${borderRadius}px;margin-bottom:16px"></div><h3 style="margin-bottom:12px">Article ${i}</h3><p style="opacity:0.7">Résumé de l'article...</p><button style="color:${primaryColor};background:none;border:none;cursor:pointer;margin-top:12px">Lire plus →</button></div>`).join('')}</div>`;
      case 'blogGrid': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;padding:60px 20px">${[1,2,3,4].map(i => `<div style="padding:24px;background:${surfaceColor};border-radius:${borderRadius}px"><h3>Article ${i}</h3><p>Description</p></div>`).join('')}</div>`;
      case 'blogList': return `<div style="max-width:800px;margin:0 auto;padding:60px 20px">${[1,2,3].map(i => `<div style="display:flex;gap:20px;margin-bottom:24px;padding:20px;background:${surfaceColor};border-radius:${borderRadius}px"><div style="width:100px;height:100px;background:${primaryColor}20;border-radius:${borderRadius}px"></div><div><h3>Article ${i}</h3><p>Date: 01/01/2025</p></div></div>`).join('')}</div>`;
      case 'blogFeatured': return `<div style="padding:60px 20px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px"><div style="background:${surfaceColor};border-radius:${borderRadius}px;overflow:hidden"><div style="height:200px;background:${primaryColor}20"></div><div style="padding:24px"><h3>Article vedette</h3><p>Description</p></div></div><div><div style="display:flex;gap:16px;margin-bottom:20px"><div style="width:80px;height:80px;background:${primaryColor}20;border-radius:${borderRadius}px"></div><div><h4>Article 1</h4></div></div><div style="display:flex;gap:16px"><div style="width:80px;height:80px;background:${primaryColor}20;border-radius:${borderRadius}px"></div><div><h4>Article 2</h4></div></div></div></div></div>`;
      case 'team': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;padding:80px 20px;text-align:center">${[1,2,3,4].map(i => `<div style="padding:24px;background:${surfaceColor};border-radius:${borderRadius}px"><div style="font-size:80px;margin-bottom:16px">👤</div><h3 style="margin-bottom:8px">Membre ${i}</h3><p>Rôle</p></div>`).join('')}</div>`;
      case 'teamGrid': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:32px;padding:60px 20px;text-align:center">${[1,2,3,4,5,6].map(i => `<div><span style="font-size:80px">👤</span><h3>Name ${i}</h3><p>Title</p></div>`).join('')}</div>`;
      case 'teamList': return `<div style="max-width:600px;margin:0 auto;padding:60px 20px">${[1,2,3].map(i => `<div style="display:flex;gap:20px;margin-bottom:24px;padding:20px;background:${surfaceColor};border-radius:${borderRadius}px"><span style="font-size:60px">👤</span><div><h3>Membre ${i}</h3><p>Rôle</p></div></div>`).join('')}</div>`;
      case 'teamCarousel': return `<div style="overflow-x:auto;padding:60px 20px;display:flex;gap:24px">${[1,2,3,4].map(i => `<div style="min-width:200px;padding:24px;background:${surfaceColor};border-radius:${borderRadius}px;text-align:center"><span style="font-size:64px">👤</span><h3>Member ${i}</h3></div>`).join('')}</div>`;
      case 'gallery': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;padding:60px 20px">${[1,2,3,4,5,6].map(i => `<div style="background:${primaryColor}20;border-radius:${borderRadius}px;aspect-ratio:1;display:flex;align-items:center;justify-content:center"><span style="font-size:48px">🖼️</span></div>`).join('')}</div>`;
      case 'galleryGrid': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;padding:60px 20px">${[1,2,3,4,5,6,7,8].map(i => `<div style="background:${primaryColor}20;border-radius:${borderRadius}px;height:150px"></div>`).join('')}</div>`;
      case 'galleryMasonry': return `<div style="column-count:3;column-gap:16px;padding:60px 20px">${[1,2,3,4,5,6].map(i => `<div style="background:${primaryColor}20;border-radius:${borderRadius}px;margin-bottom:16px;break-inside:avoid;padding:${i%2===0?'60px':'40px'};text-align:center">🖼️</div>`).join('')}</div>`;
      case 'gallerySlider': return `<div style="display:flex;gap:16px;overflow-x:auto;padding:60px 20px">${[1,2,3,4,5].map(i => `<div style="min-width:250px;height:150px;background:${primaryColor}20;border-radius:${borderRadius}px"></div>`).join('')}</div>`;
      case 'faq': return `<div style="max-width:800px;margin:0 auto;padding:80px 20px"><h2 style="text-align:center;margin-bottom:48px">FAQ</h2>${[1,2,3].map(i => `<div style="margin-bottom:16px;padding:20px;background:${surfaceColor};border-radius:${borderRadius}px"><h3 style="margin-bottom:8px">Question ${i} ?</h3><p>Réponse à la question ${i}</p></div>`).join('')}</div>`;
      case 'faqAccordion': return `<div style="padding:60px 20px"><div style="margin-bottom:12px"><button style="width:100%;padding:16px;background:${surfaceColor};border-radius:${borderRadius}px;border:none;text-align:left;font-weight:bold;cursor:pointer">📌 Question fréquente ?</button><div style="padding:16px;background:${primaryColor}10;border-radius:${borderRadius}px;margin-top:4px">Réponse détaillée à la question</div></div></div>`;
      case 'faqGrid': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;padding:60px 20px">${[1,2,3,4].map(i => `<div style="padding:24px;background:${surfaceColor};border-radius:${borderRadius}px"><h3>FAQ ${i}</h3><p>Réponse</p></div>`).join('')}</div>`;
      case 'newsletterSection': return `<div style="text-align:center;padding:80px 20px;background:${primaryColor}10;border-radius:${borderRadius}px"><h2 style="font-size:32px;margin-bottom:16px">Newsletter</h2><p style="margin-bottom:24px">Recevez nos actualités</p><div style="display:flex;gap:12px;max-width:500px;margin:0 auto"><input type="email" placeholder="Email" style="flex:1;padding:14px;border-radius:${borderRadius}px;border:1px solid ${primaryColor}"><button class="btn" style="background:${primaryColor};padding:14px 28px">S'abonner</button></div></div>`;
      case 'logoCloud': return `<div style="display:flex;gap:32px;justify-content:center;align-items:center;flex-wrap:wrap;padding:60px 20px">${[1,2,3,4,5].map(i => `<span style="font-size:60px;opacity:0.6">📦</span>`).join('')}</div>`;
      case 'logoCloudSlider': return `<div style="overflow-x:auto;padding:60px 20px;display:flex;gap:40px">${[1,2,3,4,5,6,7,8].map(i => `<span style="font-size:50px;opacity:0.6">📦</span>`).join('')}</div>`;
      case 'security': return `<div style="text-align:center;padding:80px 20px"><span style="font-size:64px;margin-bottom:24px;display:block">🛡️</span><h2 style="font-size:32px;margin-bottom:16px">Sécurité maximale</h2><p>Vos données protégées</p></div>`;
      case 'trust': return `<div style="text-align:center;padding:80px 20px;background:${primaryColor}05;border-radius:${borderRadius}px"><h2 style="font-size:32px;margin-bottom:32px">Ils nous font confiance</h2><div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap">${[1,2,3,4,5].map(i => `<span style="font-size:48px">🏢</span>`).join('')}</div></div>`;
      case 'partners': return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:24px;text-align:center;padding:80px 20px">${[1,2,3,4,5,6].map(i => `<div><span style="font-size:48px;margin-bottom:12px;display:block">🤝</span><p>Partenaire ${i}</p></div>`).join('')}</div>`;
      case 'awards': return `<div style="text-align:center;padding:80px 20px"><h2 style="font-size:32px;margin-bottom:32px">Récompenses</h2><div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap"><div><span style="font-size:48px">🏆</span><p>Best 2024</p></div><div><span style="font-size:48px">🥇</span><p>Innovation</p></div><div><span style="font-size:48px">🎖️</span><p>Top qualité</p></div></div></div>`;
      case 'recognition': return `<div style="text-align:center;padding:80px 20px;background:linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10);border-radius:${borderRadius}px"><h2 style="font-size:32px;margin-bottom:24px">Reconnu par l'industrie</h2><div style="display:flex;gap:24px;justify-content:center"><span style="font-size:48px">🏆</span><span style="font-size:48px">🏆</span><span style="font-size:48px">🏆</span></div></div>`;
      case 'tabs': return `<div style="padding:60px 20px"><div style="display:flex;gap:8px;border-bottom:2px solid ${primaryColor}30;margin-bottom:24px"><button style="padding:12px 24px;background:${primaryColor};color:white;border:none;border-radius:${borderRadius}px ${borderRadius}px 0 0">Tab 1</button><button style="padding:12px 24px;background:transparent;border:none">Tab 2</button><button style="padding:12px 24px;background:transparent;border:none">Tab 3</button></div><div style="padding:24px;background:${surfaceColor};border-radius:${borderRadius}px"><p>Contenu de l'onglet</p></div></div>`;
      case 'accordion': return `<div style="padding:60px 20px"><div style="margin-bottom:12px"><button style="width:100%;padding:16px;background:${surfaceColor};border-radius:${borderRadius}px;border:none;text-align:left;font-weight:bold;cursor:pointer">📌 Accordéon</button><div style="padding:16px;background:${primaryColor}10;border-radius:${borderRadius}px;margin-top:4px">Contenu caché</div></div></div>`;
      case 'timeline': return `<div style="padding:60px 20px;max-width:600px;margin:0 auto">${[1,2,3].map(i => `<div style="display:flex;gap:16px;margin-bottom:24px"><div style="width:40px;height:40px;border-radius:50%;background:${primaryColor};display:flex;align-items:center;justify-content:center;color:white;font-weight:bold">${i}</div><div><h3>Étape ${i}</h3><p>Description</p></div></div>`).join('')}</div>`;
      default: return `<div style="text-align:center;padding:80px 20px;background:${gradientBg};border-radius:${borderRadius}px"><h1>Section ${type}</h1><p>Contenu personnalisable</p></div>`;
    }
  };

  const renderSection = () => {
    const content = getSectionHTML(templateType);
    return (
      <div className="relative overflow-hidden rounded-2xl transition-all duration-500" style={{ borderRadius: `${borderRadius}px` }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="flex gap-3 justify-center mt-6 pt-4 border-t" style={{ borderTopColor: `${primaryColor}20`, marginTop: '20px', paddingTop: '20px' }}>
          {isPremium ? (
            <>
              <button onClick={() => downloadCode('section', templateType, 'html', content)} className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>📄 HTML</button>
              <button onClick={() => downloadCode('section', templateType, 'react', content)} className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>⚛️ React</button>
              <button onClick={() => downloadCode('section', templateType, 'tailwind', content)} className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>🎨 Tailwind</button>
            </>
          ) : (
            <div className="text-center w-full">
              <p className="text-sm text-yellow-600">🔒 Téléchargements réservés aux utilisateurs Premium</p>
              <Link href="/pricing" className="text-xs text-purple-600 underline">Passer Premium</Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // RENDU PRINCIPAL
  // ============================================================
  return (
    <div className="min-h-screen transition-all duration-500" style={{ background: bgColor, color: textColor }}>
      {/* Bandeau Premium pour utilisateurs gratuits */}
      {!isPremium && isSignedIn && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-3 px-4 text-center">
          <p className="text-yellow-700 text-sm">
            ⭐ Passez à l'offre Premium pour débloquer tous les téléchargements (HTML, React, Tailwind), 
            l'accès complet aux {ALL_SECTIONS.length} sections et {ALL_FORMS.length} formulaires.
            <Link href="/pricing" className="ml-2 underline font-semibold">Voir les offres</Link>
          </p>
        </div>
      )}

      {/* HEADER */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, padding: '60px 20px', textAlign: 'center' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">🎨 Kreativ UI Kit</h1>
          <p className="text-xl text-white/90 mb-8">{ICON_LIST.length} icônes • {ALL_FORMS.length} formulaires • {ALL_SECTIONS.length} sections</p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={saveTheme} className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>💾 Sauvegarder</button>
            <button onClick={loadTheme} className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>📂 Charger</button>
            <button onClick={() => setShowExportModal(true)} className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>📤 Exporter le thème</button>
            <button
  onClick={shareThemeToCommunity}
  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition"
>
  🌍 Partager ce thème
</button>

            {isSignedIn && (
              <>
                <button onClick={saveThemeToCloud} className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
                  ☁️ Sauvegarder dans le cloud
                </button>
                
                {userThemes.length > 0 && (
                  <select 
                    onChange={(e) => loadThemeFromCloud(e.target.value)} 
                    value={selectedThemeId}
                    className="px-4 py-3 rounded-xl font-semibold backdrop-blur-sm bg-white/20 text-white border border-white/30"
                    style={{ color: 'white' }}
                  >
                    <option value="">📁 Mes thèmes sauvegardés</option>
                    {userThemes.map((theme) => (
                      <option key={theme.id} value={theme.id} style={{ color: '#333' }}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bouton utilisateur */}
      <div className="absolute top-4 right-4 z-30">
        {isSignedIn ? (
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white text-sm">👋 {user?.firstName}</span>
            <UserButton />
          </div>
        ) : (
          <a href="/sign-in" className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/30 transition-all">
            🔐 Se connecter
          </a>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="sticky top-0 z-20 flex gap-3 justify-center flex-wrap p-4 backdrop-blur-xl border-b" style={{ background: `${surfaceColor}cc`, borderBottomColor: `${primaryColor}30` }}>
        <button onClick={() => setActiveSection('components')} className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ background: activeSection === 'components' ? primaryColor : 'transparent', color: activeSection === 'components' ? 'white' : textColor, border: `1px solid ${primaryColor}40` }}>✨ Composants</button>
        <button onClick={() => setActiveSection('icons')} className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ background: activeSection === 'icons' ? primaryColor : 'transparent', color: activeSection === 'icons' ? 'white' : textColor, border: `1px solid ${primaryColor}40` }}>📦 Icônes ({ICON_LIST.length})</button>
        <button onClick={() => setActiveSection('forms')} className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ background: activeSection === 'forms' ? primaryColor : 'transparent', color: activeSection === 'forms' ? 'white' : textColor, border: `1px solid ${primaryColor}40` }}>📝 Formulaires ({displayForms.length})</button>
        <button onClick={() => setActiveSection('sections')} className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ background: activeSection === 'sections' ? primaryColor : 'transparent', color: activeSection === 'sections' ? 'white' : textColor, border: `1px solid ${primaryColor}40` }}>🧩 Sections ({displaySections.length})</button>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* PANNAU DE CONTRÔLE */}
          <div className="rounded-2xl p-6 shadow-2xl transition-all duration-500" style={{ background: surfaceColor, backdropFilter: 'blur(10px)', borderRadius: `${borderRadius}px` }}>
            <h2 className="text-2xl font-bold mb-6">🎮 Personnalisation avancée</h2>
            <div className="mb-6"><label className="block mb-2 font-semibold">🎨 Couleur primaire</label><HexColorPicker color={primaryColor} onChange={setPrimaryColor} /><p className="mt-2 text-sm opacity-70">{primaryColor}</p></div>
            <div className="mb-6"><label className="block mb-2 font-semibold">💖 Couleur secondaire</label><HexColorPicker color={secondaryColor} onChange={setSecondaryColor} /><p className="mt-2 text-sm opacity-70">{secondaryColor}</p></div>
            <div className="mb-6"><label className="block mb-2 font-semibold">🔄 Border-radius : {borderRadius}px</label><input type="range" min="0" max="48" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full" style={{ accentColor: primaryColor }} /><div className="h-1.5 mt-2 rounded-full transition-all" style={{ width: `${borderRadius}px`, background: primaryColor }} /></div>
            <div className="mb-6"><label className="block mb-2 font-semibold">📏 Espacement : {spacing * 4}px</label><input type="range" min="1" max="12" value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} className="w-full" style={{ accentColor: primaryColor }} /></div>
            <div className="mb-6"><label className="block mb-2 font-semibold">🔤 Taille police : {fontSize}px</label><input type="range" min="12" max="32" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full" style={{ accentColor: primaryColor }} /></div>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="w-5 h-5" style={{ accentColor: primaryColor }} /><span className="font-semibold">🌙 Mode sombre</span></label>
            <div className="mt-6 p-4 rounded-xl text-center text-sm opacity-70" style={{ background: `${primaryColor}10` }}>🎨 Thème actif appliqué à tous les composants</div>
          </div>

          {/* PANNAU D'APERÇU */}
          <div className="rounded-2xl p-6 shadow-2xl transition-all duration-500 overflow-auto" style={{ background: surfaceColor, backdropFilter: 'blur(10px)', borderRadius: `${borderRadius}px` }}>
            <h2 className="text-2xl font-bold mb-6">
              {activeSection === 'components' && '✨ Composants UI'}
              {activeSection === 'icons' && '📦 Bibliothèque d\'icônes'}
              {activeSection === 'forms' && '📝 Formulaires intelligents'}
              {activeSection === 'sections' && '🧩 Sections de page'}
            </h2>

            {activeSection === 'components' && (
              <div className="space-y-8">
                <div><h3 className="font-semibold mb-3 text-lg">🔘 Bouton</h3><button className="px-8 py-3 font-bold rounded-xl transition-all hover:scale-105" style={{ background: primaryColor, borderRadius: `${borderRadius}px`, color: 'white' }}>Bouton stylisé</button>
                <div className="flex gap-2 mt-3">
                  {isPremium ? (
                    <>
                      <button onClick={() => downloadCode('component', 'button', 'html', '<button class="btn">Bouton</button>')} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>📄 HTML</button>
                      <button onClick={() => downloadCode('component', 'button', 'react', '<button>Bouton</button>')} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>⚛️ React</button>
                      <button onClick={() => downloadCode('component', 'button', 'tailwind', '<button class="btn">Bouton</button>')} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>🎨 Tailwind</button>
                    </>
                  ) : (
                    <div className="text-xs text-yellow-600">🔒 Premium requis</div>
                  )}
                </div></div>
                <div><h3 className="font-semibold mb-3 text-lg">🃏 Carte</h3><div className="p-6 rounded-xl" style={{ border: `1px solid ${primaryColor}30`, borderRadius: `${borderRadius}px`, background: surfaceColor }}><h4 className="font-bold mb-2">Titre</h4><p className="text-sm opacity-70">Contenu de la carte</p></div>
                <div className="flex gap-2 mt-3">
                  {isPremium ? (
                    <>
                      <button onClick={() => downloadCode('component', 'card', 'html', '<div class="card"><h3>Titre</h3><p>Contenu</p></div>')} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>📄 HTML</button>
                      <button onClick={() => downloadCode('component', 'card', 'react', '<div><h3>Titre</h3><p>Contenu</p></div>')} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>⚛️ React</button>
                    </>
                  ) : (
                    <div className="text-xs text-yellow-600">🔒 Premium requis</div>
                  )}
                </div></div>
                <div><h3 className="font-semibold mb-3 text-lg">📱 Modal</h3><button onClick={() => setIsModalOpen(true)} className="px-8 py-3 font-bold rounded-xl transition-all hover:scale-105" style={{ background: primaryColor, borderRadius: `${borderRadius}px`, color: 'white' }}>Ouvrir le modal</button></div>
              </div>
            )}

            {activeSection === 'icons' && (
              <div>
                <input type="text" placeholder="🔍 Rechercher..." value={searchIcon} onChange={(e) => setSearchIcon(e.target.value)} className="w-full p-3 mb-4 rounded-xl border-2 focus:outline-none transition-all" style={{ borderColor: `${primaryColor}50`, background: surfaceColor, color: textColor, borderRadius: `${borderRadius}px` }} />
                <div className="mb-4"><label className="block mb-2">📏 Taille : {iconSize}px</label><input type="range" min="24" max="96" value={iconSize} onChange={(e) => setIconSize(Number(e.target.value))} className="w-full" style={{ accentColor: primaryColor }} /></div>
                <select value={selectedIcon} onChange={(e) => setSelectedIcon(e.target.value)} className="w-full p-3 mb-6 rounded-xl border-2 focus:outline-none" style={{ borderColor: `${primaryColor}50`, background: surfaceColor, color: textColor, borderRadius: `${borderRadius}px` }}>{filteredIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select>
                <div className="text-center p-12 rounded-2xl" style={{ background: `${primaryColor}10`, borderRadius: `${borderRadius}px` }}><IconComponent size={iconSize} color={primaryColor} /><p className="mt-4 font-mono">{selectedIcon}</p>
                <div className="flex gap-2 justify-center mt-6">
                  {isPremium ? (
                    <>
                      <button onClick={() => downloadCode('icon', selectedIcon, 'html', `<div>${selectedIcon}</div>`)} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>📄 HTML</button>
                      <button onClick={() => downloadCode('icon', selectedIcon, 'react', `<div>${selectedIcon}</div>`)} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>⚛️ React</button>
                      <button onClick={() => downloadCode('icon', selectedIcon, 'tailwind', `<div>${selectedIcon}</div>`)} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: '#6c757d', color: 'white' }}>🎨 Tailwind</button>
                    </>
                  ) : (
                    <div className="text-xs text-yellow-600">🔒 Premium requis</div>
                  )}
                </div>
                <p className="text-xs mt-4 opacity-60">{filteredIcons.length} icônes disponibles</p></div>
              </div>
            )}

            {activeSection === 'forms' && (
              <div>
                <select value={formType} onChange={(e) => setFormType(e.target.value)} className="w-full p-3 mb-6 rounded-xl border-2 focus:outline-none" style={{ borderColor: `${primaryColor}50`, background: surfaceColor, color: textColor, borderRadius: `${borderRadius}px` }}>
                  {displayForms.map(key => <option key={key} value={key}>{key}</option>)}
                </select>
                {renderForm()}
              </div>
            )}

            {activeSection === 'sections' && (
              <div>
                <select value={templateType} onChange={(e) => setTemplateType(e.target.value)} className="w-full p-3 mb-6 rounded-xl border-2 focus:outline-none" style={{ borderColor: `${primaryColor}50`, background: surfaceColor, color: textColor, borderRadius: `${borderRadius}px` }}>
                  {displaySections.map(key => <option key={key} value={key}>{key}</option>)}
                </select>
                {renderSection()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL EXPORT */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setShowExportModal(false)}>
          <div className="rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" style={{ background: surfaceColor, borderRadius: `${borderRadius}px` }} onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">📤 Exporter le thème</h3>
            <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} className="w-full p-3 mb-6 rounded-xl border-2 focus:outline-none" style={{ borderColor: `${primaryColor}50`, background: surfaceColor, color: textColor, borderRadius: `${borderRadius}px` }}><option value="json">📄 JSON</option><option value="css">🎨 CSS Variables</option><option value="tailwind">🐺 Tailwind Config</option></select>
            <div className="flex gap-3"><button onClick={exportTheme} className="flex-1 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: primaryColor, color: 'white' }}>Télécharger</button><button onClick={() => setShowExportModal(false)} className="flex-1 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: '#6c757d', color: 'white' }}>Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL DEMO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" style={{ background: surfaceColor, borderRadius: `${borderRadius}px` }} onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">✨ Modal Premium</h3>
            <p className="mb-6 opacity-80">Ce modal utilise ton thème personnalisé !</p>
            <button onClick={() => setIsModalOpen(false)} className="w-full py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: primaryColor, color: 'white' }}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}