export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Politique de confidentialité</h1>
      <p className="text-gray-500 mb-8">Dernière mise à jour : 14 avril 2026</p>

      <div className="prose prose-lg max-w-none">
        <h2>1. Collecte des informations</h2>
        <p>
          Nous collectons les informations que vous nous fournissez directement, notamment :
        </p>
        <ul>
          <li>Nom, email (via Clerk)</li>
          <li>Informations de paiement (traitées par PayPal, nous ne stockons pas vos données bancaires)</li>
          <li>Vos thèmes sauvegardés (couleurs, paramètres de design)</li>
        </ul>

        <h2>2. Utilisation des informations</h2>
        <p>
          Vos informations sont utilisées pour :
        </p>
        <ul>
          <li>Fournir et maintenir notre service</li>
          <li>Gérer votre compte et votre abonnement</li>
          <li>Vous envoyer des communications liées au service</li>
          <li>Améliorer notre produit</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>
          Nous utilisons des cookies pour :
        </p>
        <ul>
          <li>Authentification (via Clerk)</li>
          <li>Sauvegarder vos préférences de thème</li>
          <li>Analyser l'utilisation du site (anonyme)</li>
        </ul>

        <h2>4. Partage des données</h2>
        <p>
          Nous ne vendons ni ne partageons vos données personnelles avec des tiers, sauf :
        </p>
        <ul>
          <li>Fournisseurs de services (hébergement Vercel, base de données Neon)</li>
          <li>Obligations légales</li>
        </ul>

        <h2>5. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité pour protéger vos données. Cependant, aucune transmission
          sur Internet n'est totalement sécurisée.
        </p>

        <h2>6. Vos droits</h2>
        <p>
          Vous avez le droit d'accéder, modifier ou supprimer vos données personnelles. Contactez-nous pour toute demande.
        </p>

        <h2>7. Contact</h2>
        <p>
          Pour toute question concernant cette politique : <strong>privacy@kreativ-ui.com</strong>
        </p>
      </div>
    </div>
  );
}