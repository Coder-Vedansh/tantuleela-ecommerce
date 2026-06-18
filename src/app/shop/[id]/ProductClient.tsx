"use client";

import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import styles from './page.module.css';
import { useCartStore } from '@/lib/store';

interface ProductClientProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    materials: string[];
    images: string[];
    sizes: string[];
    inStock: boolean;
  };
}

export default function ProductClient({ product }: ProductClientProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || '');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: `${product.name} - ${selectedSize}`,
      price: product.price,
      imageUrl: product.images[0],
      quantity: quantity,
    });
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className={styles.productPage}>
      <div className={`container ${styles.productContainer}`}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <img 
              src={mainImage} 
              alt={product.name} 
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailList}>
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={`${styles.thumbnailContainer} ${mainImage === img ? styles.active : ''}`}
                onClick={() => setMainImage(img)}
              >
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
                <button 
                  key={index} 
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button 
                className={styles.qtyBtn} 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button 
                className={styles.qtyBtn}
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
            <Button variant="primary" size="lg" className={styles.addToCartBtn} onClick={handleAddToCart}>
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
