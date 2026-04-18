export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Conditions d'utilisation</h1>
      <p className="text-gray-500 mb-8">Dernière mise à jour : 14 avril 2026</p>

      <div className="prose prose-lg max-w-none">
        <h2>1. Acceptation des conditions</h2>
        <p>
          En accédant et en utilisant Kreativ UI Kit, vous acceptez d'être lié par ces conditions d'utilisation.
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
        </p>

        <h2>2. Description du service</h2>
        <p>
          Kreativ UI Kit est un générateur de design system permettant de personnaliser, sauvegarder et exporter
          des thèmes, icônes, formulaires et sections pour vos projets web.
        </p>

        <h2>3. Comptes utilisateur</h2>
        <p>
          Pour utiliser certaines fonctionnalités (sauvegarde cloud, abonnement premium), vous devez créer un compte.
          Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités sous votre compte.
        </p>

        <h2>4. Abonnements et paiements</h2>
        <p>
          Les abonnements premium sont facturés mensuellement ou annuellement via PayPal. Les paiements sont non remboursables,
          sauf disposition contraire prévue par la loi. Vous pouvez annuler votre abonnement à tout moment depuis votre Dashboard.
        </p>

        <h2>5. Propriété intellectuelle</h2>
        <p>
          Le code généré par l'outil vous appartient. En revanche, l'outil lui-même, son code source, son design et sa marque
          sont la propriété exclusive de Kreativ UI Kit.
        </p>

        <h2>6. Limitations de responsabilité</h2>
        <p>
          Kreativ UI Kit ne pourra être tenu responsable des dommages indirects ou pertes de données résultant de l'utilisation
          de notre service. Le service est fourni "en l'état".
        </p>

        <h2>7. Modifications des conditions</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet
          dès leur publication sur cette page.
        </p>

        <h2>8. Contact</h2>
        <p>
          Pour toute question concernant ces conditions, contactez-nous à : <strong>kelly.webnux@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}