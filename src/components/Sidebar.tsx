'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'; // Importamos signOut e useSession
import styles from './Sidebar.module.css'; 
import { usePathname } from 'next/navigation'; // Adicionamos para destacar o link ativo

// Dados simulados do usuário logado (MANTIDOS)
const currentUser = {
    nomeCompleto: 'Maria Eduarda Silva',
    turma: ' - 7º Ano B ',
    escola: 'E.E. Vila Dirce II',
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
    // Usamos useSession para obter dados da sessão (opcional, mas bom para consistência)
    const { data: session } = useSession(); 
    const pathname = usePathname(); // Hook para verificar a rota atual

    // Função que será executada ao clicar em Sair
    const handleLogout = async () => {
        // Encerra a sessão e redireciona para a página /login
        await signOut({
            redirect: true,
            callbackUrl: '/login',
        });
    };

    const menuItems = [
        // Adicionamos o Dashboard
        { name: 'Dashboard', href: '/dashboard' }, 
        { name: 'Aviso', href: '/aviso' },
        { name: 'Boletim', href: '/boletim' },
        { name: 'Frequência', href: '/frequencia' },
        { name: 'Comunicação', href: '/comunicacao' },
        { name: 'Agenda', href: '/agenda' },
    ];
    
    // Tentativa de usar os dados da sessão, se existirem (ideal para um projeto real)
    const nomeExibido = session?.user?.name || currentUser.nomeCompleto;


    return (
        <div className={styles.sidebar}>
            
            {/* 1. Logo ou Título Principal */}
            <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#fff' }}>Menu Principal</h2>
            
            {/* 2. Perfil do Usuário Logado */}
            <div className={styles.userProfileTop}>
                <div className={styles.userInfoTop}>
                    
                    <UserIcon /> 
                    
                    {/* Informações */}
                    <div className={styles.userDetailsTop}>
                        <span className={styles.userNameTop}>{nomeExibido}</span>
                        <span className={styles.userRoleTop}>{currentUser.turma}</span>
                        <span className={styles.userSchoolTop}>{currentUser.escola}</span>
                    </div>
                </div>
            </div>
            
            {/* 3. Lista de Itens do Menu */}
            <ul className={styles.menuList}>
                {menuItems.map((item) => (
                    <li 
                        key={item.name} 
                        // Adicionamos a classe 'active' se o caminho for o atual
                        className={`${styles.menuItem} ${pathname === item.href ? styles.menuItemActive : ''}`}
                    >
                        <Link href={item.href} className={styles.menuLink}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            
            {/* 4. Botão de Logout Corrigido */}
            <div className={styles.logoutContainer}>
                <button 
                    className={styles.logoutButton}
                    // Adicionamos o evento onClick com a função de logout
                    onClick={handleLogout} 
                >
                    Sair
                </button>
            </div>
        </div>
    );
}