import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.column}>
          <h3 className={styles.logo}>Tantuleela</h3>
          <p className={styles.description}>
            Every Thread Woven with Devotion. Handcrafted crochet dresses and accessories for Lord Krishna idols, made with love and patience.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><Link href="/shop">Shop Collection</Link></li>
            <li><Link href="/custom-orders">Custom Orders</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Customer Care</h4>
          <ul className={styles.linksList}>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/shipping">Shipping Policy</Link></li>
            <li><Link href="/returns">Returns & Exchanges</Link></li>
            <li><Link href="/track-order">Track Order</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Get in Touch</h4>
          <ul className={styles.contactList}>
            <li>
              <Mail size={16} />
              <a href="mailto:namaste@tantuleela.com">namaste@tantuleela.com</a>
            </li>
            <li>
              <Phone size={16} />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </li>
            <li>
              <MapPin size={16} />
              <span>Vrindavan, Uttar Pradesh, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Tantuleela. All rights reserved.</p>
          <p className={styles.tagline}>सूत्रे सूत्रे भक्तिरस्ति, प्रेम्णा कृष्णः विभूष्यते॥</p>
        </div>
      </div>
    </footer>
  );
};
