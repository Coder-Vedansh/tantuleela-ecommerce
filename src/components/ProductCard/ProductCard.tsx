import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';
import styles from './ProductCard.module.css';
import { Button } from '../UI/Button';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/shop/${product.id}`} className={styles.imageWrapper}>
        {product.isNew && <span className={styles.badge}>New Arrival</span>}
        <div className={styles.imageContainer}>
          {/* Using regular img for placeholder since external domains need next.config.js config */}
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className={styles.image}
          />
        </div>
        <button className={styles.wishlistBtn} aria-label="Add to wishlist">
          <Heart size={20} />
        </button>
        <div className={styles.overlay}>
          <Button variant="secondary" fullWidth>Quick View</Button>
        </div>
      </Link>
      
      <div className={styles.content}>
        <Link href={`/shop/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
        <Button variant="outline" fullWidth className={styles.addToCartBtn}>
          <ShoppingBag size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
