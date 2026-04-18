import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kreativ UI Kit | Générateur de design system',
    template: '%s | Kreativ UI Kit'
  },
  description: 'Créez, personnalisez et exportez votre design system en temps réel. 100+ icônes, 40+ formulaires, 50+ sections. Téléchargement HTML, React et Tailwind.',
  keywords: [
    'design system', 'UI kit', 'générateur de thèmes', 'Tailwind CSS', 'React',
    'composants UI', 'formulaires', 'sections', 'designer', 'développeur'
  ],
  authors: [{ name: 'Kelly Josué AKPLOGAN', url: 'https://kreativ-ux.vercel.app' }],
  creator: 'Kelly Josué AKPLOGAN',
  publisher: 'Kreativ UX',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Kreativ UI Kit | Générateur de design system',
    description: 'Créez, personnalisez et exportez votre design system en temps réel. 100+ icônes, 40+ formulaires, 50+ sections.',
    url: 'https://kreativ-ui-kit-studx.vercel.app',
    siteName: 'Kreativ UI Kit',
    images: [
      {
        url: 'https://kreativ-ui-kit-studx.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kreativ UI Kit - Générateur de design system',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kreativ UI Kit | Générateur de design system',
    description: 'Créez, personnalisez et exportez votre design system en temps réel.',
    images: ['https://kreativ-ui-kit-studx.vercel.app/og-image.png'],
    creator: '@kreativui',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'dWJrqv6vSdD38U8EjpYnRTGeZnNZxs8ZspfzWRRDrLk',
  },
  alternates: {
    canonical: 'https://kreativ-ui-kit-studx.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}