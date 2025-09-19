'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css'; // Importa o CSS Module

export default function Sidebar() {
  const menuItems = [
    { name: 'Aviso', href: '/aviso' },
    { name: 'Boletim', href: '/boletim' },
    { name: 'Frequência', href: '/frequencia' },
    { name: 'Comunicação', href: '/comunicacao' },
    { name: 'Agenda', href: '/agenda' },
  ];

  return (
    <div className={styles.sidebar}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>Menu Principal</h2>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.menuItem}>
            <Link href={item.href} className={styles.menuLink}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}