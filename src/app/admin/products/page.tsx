"use client";
import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { Button } from '@/components/UI/Button';
import { ProductForm, ProductFormData } from '@/components/Admin/ProductForm';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      materials: product.materials,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dress?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data: ProductFormData) => {
    const isEditing = !!data.id;
    const url = isEditing ? `/api/products/${data.id}` : '/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to save product');
    }

    setIsModalOpen(false);
    fetchProducts();
  };

  return (
    <div>
      <div className={styles.productsHeader}>
        <h1 className={styles.dashboardTitle}>Manage Products</h1>
        <Button onClick={handleOpenAdd} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Plus size={18} /> Add New Dress
        </Button>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', padding: '2rem 1rem' }}>
          <ProductForm 
            initialData={editingProduct || undefined} 
            onSubmit={handleSubmit} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </div>
      )}

      <div className={styles.tableContainer}>
        {isLoading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No products found. Click "Add New Dress" to create one.</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.imageUrl} alt={product.name} className={styles.imageCell} />
                    </td>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>
                      <span style={{ color: product.stock < 5 ? 'red' : 'inherit', fontWeight: product.stock < 5 ? 'bold' : 'normal' }}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionBtn} onClick={() => handleOpenEdit(product)} title="Edit">
                          <Edit size={18} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(product.id)} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
