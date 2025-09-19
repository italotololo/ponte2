'use client';

import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { name: 'Aviso', href: '/aviso' },
    { name: 'Boletim', href: '/boletim' },
    { name: 'Frequência', href: '/frequencia' },
    { name: 'Comunicação', href: '/comunicacao' },
    { name: 'Agenda', href: '/agenda' },
  ];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      padding: '20px',
      position: 'fixed', // Torna o menu fixo
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>Menu Principal</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item.name} style={{ marginBottom: '15px' }}>
            <Link href={item.href} style={{ 
              textDecoration: 'none', 
              color: '#ecf0f1', 
              display: 'block', 
              padding: '10px', 
              borderRadius: '5px',
              transition: 'background-color 0.3s ease',
              // Adicionando um hover
              ':hover': {
                backgroundColor: '#34495e',
              }
            }}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}