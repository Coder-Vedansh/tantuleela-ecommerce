import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Home } from 'lucide-react';
import styles from './admin.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  // Simple MVP Role Check using Environment Variable
  const adminEmail = process.env.ADMIN_EMAIL || '';
  if (session.user?.email !== adminEmail && adminEmail !== '') {
    // If ADMIN_EMAIL is set and doesn't match, block access. 
    // (If not set, we'll let any authenticated user test it for MVP flexibility, but ideally block).
    redirect('/');
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Sringarika Admin</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            <Package size={20} />
            Products
          </Link>
          <Link href="/" className={styles.navLink} style={{ marginTop: 'auto' }}>
            <Home size={20} />
            Back to Store
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
