import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
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
            {products.map(product => (
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
