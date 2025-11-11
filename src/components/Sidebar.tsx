'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './Sidebar.module.css'; 
import { usePathname } from 'next/navigation';

// Dados simulados do usuário logado (MANTIDOS)
const currentUser = {
    nomeCompleto: 'Maria Eduarda Silva', // <-- Vamos usar este nome
    turma: ' - 5º Ano B ',
    escola: 'E.E. Vila Dirce II',
};

// ... (Restante dos componentes UserIcon, etc.)

// Simple UserIcon component (replace with your own SVG or image if needed)
function UserIcon() {
    return (
        <span
            style={{
                display: 'inline-block',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#eee',
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: 20,
                color: '#888',
                marginRight: 12,
            }}
            aria-label="User Icon"
        >
            👤
        </span>
    );
}

export default function Sidebar() {
    const { data: session } = useSession(); 
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/login',
        });
    };

    const menuItems = [
        { name: 'Dashboard', href: '/dashboard' }, 
        { name: 'Aviso', href: '/aviso' },
        { name: 'Boletim', href: '/boletim' },
        { name: 'Frequência', href: '/frequencia' },
        { name: 'Comunicação', href: '/comunicacao' },
        { name: 'Agenda', href: '/agenda' },
    ];
    
    // APENAS ESTA LINHA FOI ALTERADA:
    // Priorizamos o nome de Maria Eduarda (currentUser.nomeCompleto)
    const nomeExibido = currentUser.nomeCompleto || session?.user?.name || 'Usuário';


    return (
        <div className={styles.sidebar}>
            
            {/* 1. Logo ou Título Principal */}
            <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#fff' }}>Menu Principal</h2>
            
            {/* 2. Perfil do Usuário Logado */}
            <div className={styles.userProfileTop}> {/* Você pode simplificar para styles.userProfile */}
                <div className={styles.userInfoTop}>    {/* Você pode simplificar para styles.userInfo */}
                    
                    <UserIcon /> 
                    
                    {/* Informações */}
                    <div className={styles.userDetailsTop}>
                        <span className={styles.userNameTop}>{nomeExibido}</span> {/* Agora exibe Maria Eduarda Silva */}
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
                    onClick={handleLogout} 
                >
                    Sair
                </button>
            </div>
        </div>
    );
}