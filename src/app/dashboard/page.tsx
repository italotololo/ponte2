'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redireciona para o login se o usuário não estiver autenticado
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  // Se a sessão existe (usuário logado), exibe o conteúdo
  if (session) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Bem-vindo, {session.user?.name || session.user?.email}!</p>
      </div>
    );
  }

  // Retorna null enquanto o useEffect redireciona
  return null;
}