import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { ProductCard } from "@/components/ProductCard";
import styles from "./page.module.css";
import { ArrowRight, Star, Quote } from "lucide-react";

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.tagline}>सूत्रे सूत्रे भक्तिरस्ति, प्रेम्णा कृष्णः विभूष्यते॥</span>
            <h1 className={styles.heroTitle}>Every Thread Woven <br/> with Devotion</h1>
            <p className={styles.heroSubtitle}>
              Premium handcrafted crochet dresses and accessories for Lord Krishna idols, made with love and patience.
            </p>
            <div className={styles.heroActions}>
              <Link href="/shop" passHref>
                <Button size="lg">Explore Collection</Button>
              </Link>
              <Link href="/custom-orders" passHref>
                <Button variant="outline" size="lg">Custom Orders</Button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.svgDecoration}>
              <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.premiumSvg}>
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#aa7c11" />
                    <stop offset="100%" stopColor="#8b6508" />
                  </linearGradient>
                  <linearGradient id="peacockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#005f73" />
                    <stop offset="100%" stopColor="#0a9396" />
                  </linearGradient>
                  <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#001219" />
                    <stop offset="60%" stopColor="#005f73" />
                    <stop offset="100%" stopColor="#94d2bd" />
                  </radialGradient>
                </defs>
                
                {/* Flute (Basuri) - Elegant representation */}
                <g transform="translate(10, 80) rotate(-25)">
                  {/* Flute Body */}
                  <rect x="0" y="0" width="160" height="8" rx="4" fill="url(#goldGradient)" />
                  <rect x="0" y="0" width="160" height="8" rx="4" stroke="#5a4205" strokeWidth="0.5" />
                  
                  {/* Flute Details (Bands) */}
                  <rect x="15" y="-1" width="3" height="10" rx="1" fill="#5a4205" />
                  <rect x="35" y="-1" width="2" height="10" rx="1" fill="#5a4205" />
                  <rect x="140" y="-1" width="3" height="10" rx="1" fill="#5a4205" />

                  {/* Flute Holes */}
                  <circle cx="60" cy="4" r="2" fill="#2a1e02" />
                  <circle cx="75" cy="4" r="2" fill="#2a1e02" />
                  <circle cx="90" cy="4" r="2" fill="#2a1e02" />
                  <circle cx="105" cy="4" r="2" fill="#2a1e02" />
                  <circle cx="120" cy="4" r="2" fill="#2a1e02" />

                  {/* Elegant Tassel */}
                  <path d="M145,8 C150,20 135,30 145,45" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
                  <path d="M145,8 C140,25 155,35 145,50" stroke="url(#goldGradient)" strokeWidth="1" fill="none" />
                </g>

                {/* Peacock Feather - Premium Colored Art */}
                <g transform="translate(100, 20) rotate(15)">
                  {/* Stem */}
                  <path d="M40,160 Q45,80 50,0" stroke="#e9d8a6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  
                  {/* Feather Hairs (Left) */}
                  <path d="M48,20 Q30,10 25,25" stroke="url(#peacockGradient)" strokeWidth="1" fill="none" />
                  <path d="M47,30 Q20,25 15,45" stroke="#0a9396" strokeWidth="1" fill="none" />
                  <path d="M46,40 Q10,40 10,65" stroke="#94d2bd" strokeWidth="1" fill="none" />
                  <path d="M45,50 Q15,60 20,80" stroke="url(#peacockGradient)" strokeWidth="1" fill="none" />
                  <path d="M44,60 Q25,75 30,90" stroke="#005f73" strokeWidth="1" fill="none" />

                  {/* Feather Hairs (Right) */}
                  <path d="M49,15 Q65,5 70,20" stroke="url(#peacockGradient)" strokeWidth="1" fill="none" />
                  <path d="M48,25 Q75,20 80,40" stroke="#0a9396" strokeWidth="1" fill="none" />
                  <path d="M47,35 Q85,35 85,60" stroke="#94d2bd" strokeWidth="1" fill="none" />
                  <path d="M46,45 Q75,55 70,75" stroke="url(#peacockGradient)" strokeWidth="1" fill="none" />
                  <path d="M45,55 Q60,70 55,85" stroke="#005f73" strokeWidth="1" fill="none" />

                  {/* Peacock Eye */}
                  <path d="M50,5 C35,15 35,35 50,40 C65,35 65,15 50,5 Z" fill="url(#eyeGradient)" />
                  <path d="M50,15 C42,20 42,30 50,32 C58,30 58,20 50,15 Z" fill="#d4af37" />
                  <circle cx="50" cy="24" r="4" fill="#001219" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyContainer}`}>
          <div className={styles.storyImageWrapper}>
            <img 
              src="/images/2.png" 
              alt="A mother crafting crochet" 
              className={styles.storyImage}
            />
          </div>
          <div className={styles.storyContent}>
            <h2 className={styles.sectionTitle}>A Mother's Devotion</h2>
            <p className={styles.storyText}>
              What began as creating beautiful crochet outfits for Krishna at home has grown into a business dedicated to sharing these handmade creations with devotees worldwide. Every dress is a testament to patience, love, and spiritual connection.
            </p>
            <Button variant="ghost" className={styles.storyBtn}>
              Read Full Story <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className={styles.bestsellers}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Beloved Creations</h2>
            <Button variant="ghost">View All <ArrowRight size={16} /></Button>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={`container ${styles.testimonialContainer}`}>
          <Quote className={styles.quoteIcon} size={48} />
          <h2 className={styles.testimonialText}>
            "The detailing on the peacock motif dress is absolutely divine. It feels so premium and fits our Laddu Gopal perfectly. True craftsmanship!"
          </h2>
          <div className={styles.testimonialAuthor}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
            </div>
            <p className={styles.authorName}>Radhika M.</p>
            <p className={styles.authorLocation}>Vrindavan, UP</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterCard}>
            <h2 className={styles.newsletterTitle}>Join the Sringarika Family</h2>
            <p className={styles.newsletterText}>
              Subscribe to receive updates on new collections, festive offers, and stories of devotion.
            </p>
            <form className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.newsletterInput}
                required
              />
              <Button type="submit" variant="primary">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
