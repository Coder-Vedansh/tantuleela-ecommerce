import React from 'react';
import styles from './admin.module.css';
import prisma from '@/lib/prisma';
import { Package, ShoppingCart } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboard() {
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
    }
  });

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard Overview</h1>
        <p>Welcome to the Sringarika admin portal.</p>
      </div>

      <div className={styles.statsContainer}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-cream)', padding: '1rem', borderRadius: '50%', color: 'var(--color-peacock-dark)' }}>
            <Package size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Total Products</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>{productCount}</p>
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-cream)', padding: '1rem', borderRadius: '50%', color: 'var(--color-gold)' }}>
            <ShoppingCart size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Total Orders</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>{orderCount}</p>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h3 style={{ padding: '1.5rem', margin: 0, borderBottom: '1px solid var(--color-border)' }}>Recent Orders</h3>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No orders yet.</td>
              </tr>
            ) : (
              recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id.slice(0, 8)}...</td>
                  <td>{order.shippingName}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem',
                      backgroundColor: order.status === 'PAID' ? '#dcfce3' : '#fef08a',
                      color: order.status === 'PAID' ? '#166534' : '#854d0e'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td>₹{order.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
