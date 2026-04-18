export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Politique des cookies</h1>
      <p className="text-gray-500 mb-8">Dernière mise à jour : 14 avril 2026</p>

      <div className="prose prose-lg max-w-none">
        <h2>Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite d'un site web.
          Il permet de mémoriser des informations sur votre navigation.
        </p>

        <h2>Cookies que nous utilisons</h2>

        <h3>🍪 Cookies essentiels (obligatoires)</h3>
        <ul>
          <li><strong>session</strong> : Maintient votre session utilisateur</li>
          <li><strong>__clerk_*</strong> : Gère votre authentification (via Clerk)</li>
        </ul>

        <h3>🍪 Cookies de préférences</h3>
        <ul>
          <li><strong>kreativ-theme</strong> : Sauvegarde votre thème personnalisé (couleurs, paramètres)</li>
        </ul>

        <h3>📊 Cookies analytiques (anonymes)</h3>
        <ul>
          <li><strong>_ga, _gid</strong> : Google Analytics (mesure d'audience)</li>
          <li><strong>vercel-analytics</strong> : Analytics de Vercel</li>
        </ul>

        <h2>Gestion des cookies</h2>
        <p>
          Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur :
        </p>
        <ul>
          <li>Chrome : Paramètres → Confidentialité → Cookies</li>
          <li>Firefox : Options → Vie privée → Cookies</li>
          <li>Safari : Préférences → Confidentialité → Cookies</li>
          <li>Edge : Paramètres → Cookies et autorisations</li>
        </ul>

        <h2>Cookies tiers</h2>
        <p>
          Notre site utilise des services tiers qui peuvent déposer leurs propres cookies :
        </p>
        <ul>
          <li><strong>Clerk</strong> : Authentification</li>
          <li><strong>PayPal</strong> : Paiements (lors de l'utilisation de la page tarifs)</li>
          <li><strong>Vercel</strong> : Hébergement et analytics</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Pour toute question concernant notre utilisation des cookies : <strong>kelly.webnux@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}