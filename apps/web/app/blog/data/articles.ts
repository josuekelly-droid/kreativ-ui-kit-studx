export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  authorAvatar: string;
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "assistant-ia-arrive",
    title: "L'assistant IA est arrivé !",
    excerpt: "Générez du code React/Tailwind instantanément. Décrivez ce que vous voulez, l'IA le crée pour vous.",
    content: `
      <p>Nous sommes ravis de vous annoncer le lancement de notre assistant IA intégré !</p>
      <h2>Comment ça fonctionne ?</h2>
      <p>Il vous suffit de décrire le composant ou la section que vous souhaitez créer, et notre IA génère le code React/Tailwind correspondant.</p>
      <h2>Exemple de prompt</h2>
      <pre><code>"Crée une carte de présentation pour un développeur freelance avec une photo, un nom, une spécialité et un bouton de contact"</code></pre>
      <h2>Limites actuelles</h2>
      <p>Les utilisateurs gratuits bénéficient de 10 générations par jour. Les utilisateurs Premium ont un accès illimité.</p>
      <h2>Accès à l'IA</h2>
      <p>Rendez-vous dans votre tableau de bord (Dashboard) pour tester l'assistant IA dès maintenant !</p>
    `,
    date: "15 avril 2026",
    category: "ia",
    readTime: "3 min",
    image: "🤖",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 2,
    slug: "personnaliser-votre-theme",
    title: "Comment personnaliser votre thème",
    excerpt: "Découvrez comment utiliser le ThemeBuilder pour créer un design system unique.",
    content: `
      <p>Le ThemeBuilder est l'outil central de Kreativ UI Kit Pro. Il vous permet de personnaliser chaque aspect visuel de votre design system.</p>
      <h2>Les paramètres disponibles</h2>
      <ul>
        <li><strong>Couleur primaire</strong> : la couleur principale de votre interface</li>
        <li><strong>Couleur secondaire</strong> : pour les accents et les appels à l'action</li>
        <li><strong>Border-radius</strong> : l'arrondi des coins de vos composants</li>
        <li><strong>Espacement</strong> : la marge et le padding par défaut</li>
        <li><strong>Mode sombre</strong> : activez ou désactivez le thème sombre</li>
      </ul>
      <h2>Export du thème</h2>
      <p>Une fois votre thème personnalisé, vous pouvez l'exporter en JSON, CSS Variables ou Tailwind Config pour l'intégrer directement dans vos projets.</p>
    `,
    date: "10 avril 2026",
    category: "tutoriels",
    readTime: "5 min",
    image: "🎨",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 3,
    slug: "export-tailwind-config",
    title: "Nouveau : Export Tailwind Config",
    excerpt: "Exportez votre thème directement en fichier de configuration Tailwind.",
    content: `
      <p>Nouvelle fonctionnalité très attendue : l'export de votre thème en fichier de configuration Tailwind !</p>
      <h2>Comment utiliser cette fonctionnalité ?</h2>
      <p>Après avoir personnalisé votre thème dans le ThemeBuilder, cliquez sur "Exporter le thème" puis sélectionnez "Tailwind Config".</p>
      <h2>Intégration dans votre projet</h2>
      <p>Le fichier généré contient toutes vos couleurs, vos arrondis et vos espacements prêts à être utilisés dans votre projet Tailwind.</p>
      <p>Copiez simplement le fichier dans votre projet et importez-le dans votre tailwind.config.js.</p>
    `,
    date: "5 avril 2026",
    category: "nouveautes",
    readTime: "2 min",
    image: "📦",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 4,
    slug: "10-astuces-productivite",
    title: "10 astuces pour booster votre productivité",
    excerpt: "Gagnez du temps avec ces astuces méconnues de Kreativ UI Kit Pro.",
    content: `
      <p>Voici 10 astuces pour tirer le meilleur parti de Kreativ UI Kit Pro.</p>
      <h2>1. Utilisez les raccourcis clavier</h2>
      <p>Naviguez plus vite entre les sections du ThemeBuilder.</p>
      <h2>2. Sauvegardez vos thèmes dans le cloud</h2>
      <p>Ne perdez jamais votre travail et accédez-y depuis n'importe où.</p>
      <h2>3. Exploitez l'assistant IA</h2>
      <p>Générez des composants complexes en quelques secondes.</p>
      <h2>4. Exportez vos composants individuellement</h2>
      <p>Chaque icône, formulaire et section peut être téléchargé séparément.</p>
      <h2>5. Utilisez le mode sombre</h2>
      <p>Protégez vos yeux lors des longues sessions de design.</p>
      <h2>6. Expérimentez avec les couleurs</h2>
      <p>Le sélecteur de couleur en temps réel vous permet de tester rapidement.</p>
      <h2>7. Consultez la documentation</h2>
      <p>Des guides détaillés pour chaque fonctionnalité.</p>
      <h2>8. Passez à Premium</h2>
      <p>Débloquez tous les téléchargements et l'IA illimitée.</p>
      <h2>9. Partagez vos thèmes</h2>
      <p>Exportez vos thèmes pour les partager avec votre équipe.</p>
      <h2>10. Restez informé</h2>
      <p>Abonnez-vous à la newsletter pour ne rien manquer.</p>
    `,
    date: "28 mars 2026",
    category: "tutoriels",
    readTime: "4 min",
    image: "⚡",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 5,
    slug: "premium-telechargements-illimites",
    title: "Premium : Téléchargements illimités",
    excerpt: "Les utilisateurs Premium bénéficient désormais de téléchargements illimités.",
    content: `
      <p>Bonne nouvelle pour nos utilisateurs Premium ! Vous bénéficiez désormais de téléchargements illimités.</p>
      <h2>Qu'est-ce que ça change ?</h2>
      <p>Plus aucune limite sur le nombre de téléchargements de composants, de sections et de formulaires.</p>
      <h2>Comment devenir Premium ?</h2>
      <p>Rendez-vous sur la page Tarifs pour choisir l'abonnement qui vous convient (mensuel ou annuel).</p>
      <h2>Avantages Premium</h2>
      <ul>
        <li>Téléchargements illimités (HTML, React, Tailwind)</li>
        <li>Accès complet à toutes les sections (50+)</li>
        <li>Accès complet à tous les formulaires (40+)</li>
        <li>Export ZIP du kit complet</li>
        <li>Support prioritaire</li>
      </ul>
    `,
    date: "20 mars 2026",
    category: "nouveautes",
    readTime: "2 min",
    image: "💎",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
  {
    id: 6,
    slug: "ia-genere-code-qualite",
    title: "Comment l'IA génère du code de qualité",
    excerpt: "Découvrez les coulisses de notre assistant IA et comment il produit du code fiable.",
    content: `
      <p>Notre assistant IA utilise le modèle Llama 3.3 70B via Groq pour générer du code React/Tailwind de haute qualité.</p>
      <h2>Comment ça marche ?</h2>
      <p>Le modèle a été spécialement entraîné pour comprendre les besoins des développeurs et designers modernes.</p>
      <h2>Pourquoi la qualité est-elle si bonne ?</h2>
      <p>Nous utilisons des prompts système sophistiqués qui guident l'IA vers les meilleures pratiques de développement.</p>
      <h2>Exemples de ce que l'IA peut générer</h2>
      <ul>
        <li>Composants React (cartes, formulaires, boutons, modals)</li>
        <li>Sections de page (hero, features, testimonials, pricing)</li>
        <li>Landing pages complètes</li>
      </ul>
      <h2>Testez par vous-même</h2>
      <p>Connectez-vous à votre Dashboard et essayez l'assistant IA dès maintenant !</p>
    `,
    date: "15 mars 2026",
    category: "ia",
    readTime: "6 min",
    image: "🧠",
    author: "Kelly Josué",
    authorAvatar: "👨‍🎨",
  },
];