'use client'; // Necessário para usar hooks como useState

import { useState } from 'react';
import { signIn } from 'next-auth/react'; // Importa a função de login do Auth.js
import { useRouter } from 'next/navigation'; // Hook para navegação
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Chama a função `signIn` do Auth.js para autenticar o usuário
    const result = await signIn('credentials', {
      redirect: false, // Evita o redirecionamento automático
      email,
      password,
    });

    if (result?.ok) {
      // Se a autenticação foi bem-sucedida
      console.log('Login bem-sucedido!');
      router.push('/dashboard'); // Redireciona para a página de dashboard
    } else {
      // Se a autenticação falhou
      console.error('Falha no login:', result?.error);
      setError(result?.error || 'Email ou senha inválidos.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ padding: '40px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
            Entrar
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Ainda não tem uma conta? <Link href="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}