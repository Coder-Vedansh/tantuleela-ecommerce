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
  title: "Sringarika | Handcrafted Crochet for Lord Krishna",
  description: "Premium handcrafted crochet dresses and accessories for Lord Krishna idols. Every thread woven with devotion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

