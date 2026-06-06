"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.leftSection}>
          <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
            <li><Link href="/custom-orders" onClick={() => setIsMenuOpen(false)}>Custom Orders</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          </ul>
        </div>

        <div className={styles.logoSection}>
          <Link href="/">
            <h1 className={styles.logo}>Sringarika</h1>
          </Link>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/account" className={styles.iconBtn} aria-label="User Account">
            <User size={20} />
          </Link>
          <Link href="/cart" className={styles.iconBtn} aria-label="Shopping Cart">
            <ShoppingCart size={20} />
            <span className={styles.cartCount}>0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
