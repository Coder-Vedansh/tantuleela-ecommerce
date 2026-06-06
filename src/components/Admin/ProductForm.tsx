"use client";
import React, { useState } from 'react';
import { Button } from '../UI/Button';

export interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 10,
    imageUrl: initialData?.imageUrl || '/images/1.png',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
      alert('Error saving product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
      <h2>{initialData ? 'Edit Product' : 'Add New Product'}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="name">Product Name</label>
        <input 
          type="text" 
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
          rows={3}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <label htmlFor="price">Price (₹)</label>
          <input 
            type="number" 
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            required
            min="0"
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <label htmlFor="stock">Stock Quantity</label>
          <input 
            type="number" 
            id="stock"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
            required
            min="0"
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="imageUrl">Image URL</label>
        <input 
          type="text" 
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          required
          placeholder="/images/1.png or https://..."
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button type="button" variant="outline" onClick={onCancel} fullWidth>Cancel</Button>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  );
};
