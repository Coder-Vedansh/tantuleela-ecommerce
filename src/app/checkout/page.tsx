"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/UI/Button';
import { ShieldCheck, Truck } from 'lucide-react';
import styles from './page.module.css';

export default function CheckoutPage() {
  const cart = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) return alert("Your cart is empty!");

    setIsProcessing(true);
    
    try {
      // 1. Create order in our database and get Razorpay Order ID
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          shipping: formData
        })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Sringarika",
        description: "Premium Handcrafted Crochet",
        order_id: data.orderId,
        handler: async function (response: any) {
          // Verify payment on the server
          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              internalOrderId: data.internalOrderId
            })
          });
          
          if (verifyRes.ok) {
            cart.clearCart();
            window.location.href = `/success?order_id=${data.internalOrderId}`;
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#005B8F"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment Failed: " + response.error.description);
      });
      
      rzp.open();
    } catch (error: any) {
      alert("Checkout error: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <h2>Your Cart is Empty</h2>
        <p>Explore our collections to find beautiful handcrafted outfits.</p>
        <Button onClick={() => window.location.href = '/shop'}>Go to Shop</Button>
      </div>
    );
  }

  return (
    <div className={`container ${styles.checkoutContainer}`}>
      <div className={styles.checkoutForm}>
        <h1 className={styles.title}>Checkout</h1>
        
        <form onSubmit={handleCheckout} className={styles.form}>
          <h2 className={styles.sectionTitle}>Contact & Shipping Information</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input required type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number *</label>
            <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Street Address *</label>
            <textarea required id="address" name="address" rows={3} value={formData.address} onChange={handleInputChange}></textarea>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City *</label>
              <input required type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state">State *</label>
              <input required type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pincode">PIN Code *</label>
              <input required type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
            </div>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <ShieldCheck size={20} className={styles.icon} />
              <span>Secure Razorpay Payment</span>
            </div>
            <div className={styles.badge}>
              <Truck size={20} className={styles.icon} />
              <span>Reliable Courier Shipping</span>
            </div>
          </div>

          <Button type="submit" size="lg" fullWidth disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay ₹${cart.totalPrice().toLocaleString('en-IN')}`}
          </Button>
        </form>
      </div>

      <div className={styles.orderSummary}>
        <h2 className={styles.sectionTitle}>Order Summary</h2>
        <div className={styles.cartItems}>
          {cart.items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
              </div>
              <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>₹{cart.totalPrice().toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total</span>
            <span>₹{cart.totalPrice().toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
