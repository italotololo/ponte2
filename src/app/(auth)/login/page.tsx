'use client'; 

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      console.log('Login bem-sucedido!');
      router.push('/dashboard');
    } else {
      console.error('Falha no login:', result?.error);
      setError(result?.error || 'Email ou senha inválidos.');
    }
  };
  

  return (
    <div 
    
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f0f0f0', 
        backgroundImage: `url('/login.jpeg')`, // Imagem de fundo
        backgroundSize: 'cover', // Cobre toda a área
        backgroundPosition: 'center', // Centraliza a imagem
      }}
    >
      <div 
      
        style={{
          // Dimensões do formulário 
          width: '300px', // largura 
          height: '300px', // altura
         

          // Estilos da caixa de login
          padding: '40px',
          borderRadius: '10px',
          backgroundColor: 'transparent', // Fundo transparente para mostrar a imagem
          boxShadow: '0 4px 6px rgba(14, 1, 1, 0.97)',
          display: 'flex', // Permite que o conteúdo interno seja centralizado
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#0c4b92ff' }}></h1>
        <p style={{ color: '#0c4b92ff' }}></p>
        <br />
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}></h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',gap: '15px',alignItems: 'center' }}>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div>
  <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#1a0f04ff' }}>Email:</label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    style={{ width: '250px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
  />
</div>
<div>
  <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#0f0404ff' }}>Senha:</label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={{ width: '250px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
  />
</div>
          <button 
            type="submit" 
            style={{ padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#0c4b92ff', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
            Entrar
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '5px' }}>
          * <Link href="/register">*</Link>
        </p>
      </div>
    </div>
  );
}