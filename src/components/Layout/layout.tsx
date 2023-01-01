import styles from './layout.module.css';
import Header from '@/components/Layout/Header/header';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main style={{ background: '#f0f2f5' }}>{children}</main>
    </div>
  );
}
