import type { Metadata } from "next";
import { Playfair_Display, Inter, Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL('https://tantuleela-git-main-coder-vedanshs-projects.vercel.app'),
  title: {
    default: "Sringarika | Handcrafted Crochet for Lord Krishna",
    template: "%s | Sringarika"
  },
  description: "Premium handcrafted crochet dresses and accessories for Lord Krishna idols. Every thread woven with devotion.",
  keywords: ["krishna crochet", "laddu gopal dress", "handmade krishna clothes", "vrindavan crochet", "radha krishna outfits"],
  openGraph: {
    title: "Sringarika | Handcrafted Crochet for Lord Krishna",
    description: "Premium handcrafted crochet dresses and accessories for Lord Krishna idols. Every thread woven with devotion.",
    url: 'https://tantuleela-git-main-coder-vedanshs-projects.vercel.app',
    siteName: 'Sringarika',
    images: [
      {
        url: '/images/krishna-teal-luxury.png',
        width: 800,
        height: 600,
        alt: 'Sringarika - Handcrafted Crochet for Lord Krishna',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sringarika | Handcrafted Crochet for Lord Krishna',
    description: 'Premium handcrafted crochet dresses and accessories for Lord Krishna idols.',
    images: ['/images/krishna-teal-luxury.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sringarika",
              "url": "https://tantuleela-git-main-coder-vedanshs-projects.vercel.app",
              "logo": "https://tantuleela-git-main-coder-vedanshs-projects.vercel.app/images/krishna-teal-luxury.png",
              "description": "Premium handcrafted crochet dresses and accessories for Lord Krishna idols."
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Sringarika",
              "url": "https://tantuleela-git-main-coder-vedanshs-projects.vercel.app"
            })
          }}
        />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

