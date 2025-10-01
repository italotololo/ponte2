'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css'; 

// Dados simulados do usuário logado (MANTIDOS)
const currentUser = {
  nomeCompleto: 'Maria Eduarda Silva',
  turma: ' - 7º Ano B ',
  escola: 'E.E. Vila Dirce II',
  // Removemos avatarUrl pois usaremos um ícone
};

// Ícone SVG de Usuário Simples
const UserIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={styles.avatarIcon} // Use uma classe para estilizar o tamanho e cor no CSS
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);


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
      
      {/* 1. Logo ou Título Principal */}
      <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#fff' }}>Menu Principal</h2>
      
      {/* 2. Perfil do Usuário Logado - NOVO BLOCO NO TOPO */}
      <div className={styles.userProfileTop}>
        <div className={styles.userInfoTop}>
          
          {/* SUBSTITUÍMOS A TAG <img> POR ESTE ÍCONE */}
          <UserIcon /> 
          
          {/* Informações */}
          <div className={styles.userDetailsTop}>
            <span className={styles.userNameTop}>{currentUser.nomeCompleto}</span>
            <span className={styles.userRoleTop}>{currentUser.turma}</span>
            <span className={styles.userSchoolTop}>{currentUser.escola}</span>
          </div>
        </div>
      </div>
      
      {/* 3. Lista de Itens do Menu */}
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.menuItem}>
            <Link href={item.href} className={styles.menuLink}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* 4. Botão de Logout */}
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton}>
          Sair
        </button>
      </div>
    </div>
  );
}