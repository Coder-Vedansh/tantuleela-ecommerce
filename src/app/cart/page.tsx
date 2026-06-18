"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/UI/Button';
import { Trash2, ShoppingBag } from 'lucide-react';
import styles from './page.module.css';

export default function CartPage() {
  const cart = useCartStore();

  if (cart.items.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <ShoppingBag size={64} color="var(--color-gold)" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartContainer}`}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {cart.items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</p>
                
                <div className={styles.quantityControl}>
                  <button 
                    className={styles.qtyBtn}
                    onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button 
                    className={styles.qtyBtn}
                    onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className={styles.itemTotal}>
                <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                <button 
                  className={styles.removeBtn}
                  onClick={() => cart.removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal ({cart.totalItems()} items)</span>
            <span>₹{cart.totalPrice().toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
            <span>Estimated Total</span>
            <span>₹{cart.totalPrice().toLocaleString('en-IN')}</span>
          </div>
          
          <Link href="/checkout">
            <Button size="lg" fullWidth>Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
