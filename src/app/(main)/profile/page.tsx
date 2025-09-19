'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protege a rota: redireciona para a página de login se o usuário não estiver autenticado.
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Exibe uma mensagem de carregamento enquanto a sessão é verificada.
  if (status === 'loading') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Carregando...</p>
      </div>
    );
  }

  // Se a sessão existe (usuário logado), exibe o conteúdo do perfil.
  if (session) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Perfil do Usuário</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <p><strong>Nome:</strong></p>
            <p>{session.user?.name}</p>
          </div>
          <div>
            <p><strong>Email:</strong></p>
            <p>{session.user?.email}</p>
          </div>
          {/* Você pode adicionar mais campos aqui, como telefone, etc., se tiver no seu objeto de sessão */}
        </div>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link href="/dashboard" style={{ padding: '10px 20px', borderRadius: '4px', border: '1px solid #0070f3', backgroundColor: 'transparent', color: '#0070f3', textDecoration: 'none', cursor: 'pointer' }}>
            Ir para Dashboard
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  // Se o status for "unauthenticated", o useEffect já terá redirecionado.
  return null;
}