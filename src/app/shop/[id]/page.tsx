import React from 'react';
import { ShoppingBag, Heart, Star, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import styles from './page.module.css';

// Mock function to simulate fetching product data
const getProduct = (id: string) => {
  return {
    id,
    name: "Peacock Motif Yellow Dress",
    price: 1250,
    description: "A beautiful handcrafted crochet dress for Lord Krishna, inspired by the vibrant colors of peacock feathers. Made with premium cotton yarn, ensuring comfort and elegance. Perfect for Janmashtami and other festive occasions.",
    materials: ["100% Premium Cotton Yarn", "Gold-plated accent beads", "Soft inner lining"],
    images: [
      "https://placehold.co/800x1000/D6E4F0/2C3E50?text=Yellow+Dress+Front",
      "https://placehold.co/800x1000/D6E4F0/2C3E50?text=Yellow+Dress+Back",
      "https://placehold.co/800x1000/D6E4F0/2C3E50?text=Yellow+Dress+Detail"
    ],
    sizes: ["Size 0 (0-2 inches)", "Size 1 (2-3 inches)", "Size 2 (3-4 inches)", "Size 3 (4-5 inches)", "Size 4 (5-6 inches)"],
    inStock: true,
  };
};

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.id);

  return (
    <div className={styles.productPage}>
      <div className={`container ${styles.productContainer}`}>
        
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailList}>
            {product.images.map((img, index) => (
              <div key={index} className={styles.thumbnailContainer}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className={styles.thumbnail} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.reviews}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
            </div>
            <span className={styles.reviewCount}>(24 reviews)</span>
          </div>

          <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
          
          <p className={styles.description}>{product.description}</p>

          <div className={styles.divider}></div>

          {/* Size Selector */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Select Size (Idol Size)</h3>
              <button className={styles.sizeGuideBtn}><Ruler size={16} /> Size Guide</button>
            </div>
            <div className={styles.sizeSelector}>
              {product.sizes.map((size, index) => (
                <button key={index} className={`${styles.sizeBtn} ${index === 2 ? styles.active : ''}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button className={styles.qtyBtn}>-</button>
              <span className={styles.qtyValue}>1</span>
              <button className={styles.qtyBtn}>+</button>
            </div>
            <Button variant="primary" size="lg" className={styles.addToCartBtn}>
              <ShoppingBag size={20} /> Add to Cart
            </Button>
            <button className={styles.wishlistBtn} aria-label="Add to wishlist">
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <Truck size={24} className={styles.badgeIcon} />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders over ₹2000</p>
              </div>
            </div>
            <div className={styles.badge}>
              <ShieldCheck size={24} className={styles.badgeIcon} />
              <div>
                <h4>Secure Payment</h4>
                <p>100% safe & secure checkout</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={styles.additionalInfo}>
            <h3 className={styles.infoTitle}>Materials & Care</h3>
            <ul className={styles.infoList}>
              {product.materials.map((mat, i) => <li key={i}>{mat}</li>)}
              <li>Hand wash only with mild detergent. Do not wring. Dry flat in shade.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
