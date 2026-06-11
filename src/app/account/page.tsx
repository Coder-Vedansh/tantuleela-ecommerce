import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from "./account.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Account',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className={styles.accountPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Account</h1>
          <p className={styles.subtitle}>Welcome back, {session.user?.name || session.user?.email || "User"}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardSection}>
            <h2 className={styles.sectionTitle}>Account Details</h2>
            <div className={styles.detailRow}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{session.user?.email}</span>
            </div>
            {session.user?.name && (
              <div className={styles.detailRow}>
                <span className={styles.label}>Name:</span>
                <span className={styles.value}>{session.user?.name}</span>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <Link href="/api/auth/signout" className={styles.logoutBtn}>
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
