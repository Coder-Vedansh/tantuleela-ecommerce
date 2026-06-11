import React from 'react';
import { Upload, Camera, Send } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Orders',
  description: 'Request custom handcrafted crochet outfits for Lord Krishna. Share your vision and let us weave it into reality.',
};

export default function CustomOrdersPage() {
  return (
    <div className={styles.customOrderPage}>
      {/* Header Banner */}
      <div className={styles.headerBanner}>
        <div className={`container ${styles.headerContent}`}>
          <h1 className={styles.title}>Custom Creations</h1>
          <p className={styles.subtitle}>
            Have a specific vision for your Lord Krishna's outfit? Let's bring it to life together.
          </p>
        </div>
      </div>

      <div className={`container ${styles.formContainer}`}>
        <div className={styles.instructionSidebar}>
          <h2 className={styles.sidebarTitle}>How It Works</h2>
          <ol className={styles.stepsList}>
            <li>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Share Your Vision</h3>
                <p>Upload reference images or describe the design, colors, and motifs you want.</p>
              </div>
            </li>
            <li>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Consultation</h3>
                <p>We'll contact you to confirm details, suggest materials, and provide a quote.</p>
              </div>
            </li>
            <li>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Crafting</h3>
                <p>Our artisans begin weaving your custom piece with devotion and care.</p>
              </div>
            </li>
            <li>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Delivery</h3>
                <p>Receive your one-of-a-kind handmade outfit at your doorstep.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className={styles.formSection}>
          <form className={styles.customForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Full Name *</label>
              <input type="text" id="name" className={styles.input} required />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email Address *</label>
                <input type="email" id="email" className={styles.input} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone/WhatsApp *</label>
                <input type="tel" id="phone" className={styles.input} required />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="idolType" className={styles.label}>Idol Type *</label>
                <select id="idolType" className={styles.select} required>
                  <option value="">Select...</option>
                  <option value="laddu-gopal">Laddu Gopal</option>
                  <option value="radha-krishna">Radha Krishna</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="idolSize" className={styles.label}>Idol Size (in inches) *</label>
                <input type="number" id="idolSize" className={styles.input} min="1" max="24" required />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="colorTheme" className={styles.label}>Preferred Color Theme</label>
              <input type="text" id="colorTheme" className={styles.input} placeholder="e.g. Pink and Gold, Peacock Blue" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="details" className={styles.label}>Design Details & Special Instructions *</label>
              <textarea 
                id="details" 
                className={styles.textarea} 
                rows={5} 
                placeholder="Describe your vision, specific motifs (e.g. flute, lotus), or any other details..."
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Upload Reference Images</label>
              <div className={styles.uploadArea}>
                <Upload size={32} className={styles.uploadIcon} />
                <p>Drag and drop images here, or click to browse</p>
                <p className={styles.uploadHint}>Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
                <Button type="button" variant="outline" className={styles.uploadBtn}>
                  <Camera size={16} /> Select Images
                </Button>
              </div>
            </div>

            <Button type="submit" size="lg" fullWidth className={styles.submitBtn}>
              <Send size={18} /> Request Custom Quote
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
