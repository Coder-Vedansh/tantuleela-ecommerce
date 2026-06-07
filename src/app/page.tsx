import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { ProductCard } from "@/components/ProductCard";
import styles from "./page.module.css";
import { ArrowRight, Star, Quote, HeartHandshake, PenTool, Sparkles, Truck } from "lucide-react";

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
        <div className={styles.heroBackground}>
          <div className={styles.templeTexture}></div>
          <div className={styles.glowingParticles}></div>
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.tagline}>सूत्रे सूत्रे भक्तिरस्ति, प्रेम्णा कृष्णः विभूष्यते॥</span>
            <h1 className={styles.heroTitle}>Every Thread<br/>Woven with<br/>Devotion</h1>
            <p className={styles.heroSubtitle}>
              Handcrafted crochet dresses and divine accessories created with love for Lord Krishna.
            </p>
            <div className={styles.heroActions}>
              <Link href="/shop" passHref>
                <Button size="lg" className={styles.btnSolidGold}>Explore Collection</Button>
              </Link>
              <Link href="/custom-orders" passHref>
                <Button variant="outline" size="lg" className={styles.btnOutlineIvory}>Custom Orders</Button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.imageShadow}></div>
            <img 
              src="/images/krishna-luxury-hero.png" 
              alt="Luxury Handcrafted Crochet for Lord Krishna" 
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <div className={styles.trustStrip}>
        <div className={`container ${styles.trustContainer}`}>
          <div className={styles.trustItem}><HeartHandshake size={20} /> <span>Handmade</span></div>
          <div className={styles.trustItem}><PenTool size={20} /> <span>Custom Orders</span></div>
          <div className={styles.trustItem}><Sparkles size={20} /> <span>Premium Yarn</span></div>
          <div className={styles.trustItem}><Truck size={20} /> <span>Fast Delivery</span></div>
        </div>
      </div>

      {/* Featured Collection Strip Overlay */}
      <div className={styles.featuredStrip}>
        <div className={`container ${styles.featuredContainer}`}>
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className={styles.featuredImage} />
                )}
              </div>
              <div className={styles.featuredInfo}>
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
