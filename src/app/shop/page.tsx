import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

const MOCK_PRODUCTS = [
  { id: "1", name: "Peacock Motif Yellow Dress", price: 1250, imageUrl: "https://placehold.co/600x800/D6E4F0/2C3E50?text=Yellow+Dress", isNew: true },
  { id: "2", name: "Lotus Pink Night Outfit", price: 850, imageUrl: "https://placehold.co/600x800/F3E5AB/2C3E50?text=Pink+Outfit" },
  { id: "3", name: "Royal Blue Festival Set", price: 2100, imageUrl: "https://placehold.co/600x800/005B8F/FFFFFF?text=Festival+Set", isNew: true },
  { id: "4", name: "Cream & Gold Winter Wear", price: 1500, imageUrl: "https://placehold.co/600x800/FFFFF0/003F66?text=Winter+Wear" },
  { id: "5", name: "Emerald Green Summer Set", price: 1100, imageUrl: "https://placehold.co/600x800/e8f5e9/2e7d32?text=Summer+Set" },
  { id: "6", name: "Pearl White Everyday Dress", price: 750, imageUrl: "https://placehold.co/600x800/f5f5f5/616161?text=Everyday+Dress" },
  { id: "7", name: "Ruby Red Festive Special", price: 2500, imageUrl: "https://placehold.co/600x800/ffebee/c62828?text=Festive+Special" },
  { id: "8", name: "Purple Flute Pattern Dress", price: 1350, imageUrl: "https://placehold.co/600x800/f3e5f5/6a1b9a?text=Pattern+Dress" },
];

export default function ShopPage() {
  return (
    <div className={styles.shopContainer}>
      <div className={styles.shopHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Shop Collection</h1>
          <p className={styles.pageSubtitle}>Discover handcrafted perfection for Lord Krishna</p>
        </div>
      </div>

      <div className={`container ${styles.shopContent}`}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <ul className={styles.filterList}>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> All Products
                </label>
              </li>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Everyday Wear
                </label>
              </li>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Festival Collection
                </label>
              </li>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Winter Wear
                </label>
              </li>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Accessories
                </label>
              </li>
            </ul>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Price Range</h3>
            <ul className={styles.filterList}>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Under ₹1,000
                </label>
              </li>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> ₹1,000 - ₹2,000
                </label>
              </li>
              <li>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Above ₹2,000
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Product Area */}
        <main className={styles.mainArea}>
          <div className={styles.toolbar}>
            <div className={styles.mobileFilterBtn}>
              <Filter size={18} /> Filters
            </div>
            <div className={styles.resultsCount}>Showing 1-8 of 24 products</div>
            <div className={styles.sortDropdown}>
              <span>Sort by:</span>
              <button className={styles.sortBtn}>
                Featured <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className={styles.productGrid}>
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled>Prev</button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </main>
      </div>
    </div>
  );
}
