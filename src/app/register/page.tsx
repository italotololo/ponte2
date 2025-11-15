'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');

    // Aqui iria a chamada real para a API de recuperação de senha.
    // Este é um placeholder simples para simular envio.
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // simula delay
      setStatus('sent');
    } catch {
      setError('Não foi possível processar a solicitação. Tente novamente mais tarde.');
      setStatus('idle');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          width: 'min(420px, 92vw)',
          padding: '28px',
          borderRadius: '10px',
          backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>Recuperar senha</h1>

        {status === 'sent' ? (
          <p style={{ textAlign: 'center', color: '#0a7a3a', marginTop: 0 }}>
            Enviamos instruções para redefinição por e-mail. Se não encontrar, entre em contato com sua instituição.
          </p>
        ) : (
          <>
            <p style={{ textAlign: 'center', color: '#555', marginTop: 0 }}>
              Informe seu e-mail para receber instruções de recuperação.
            </p>

            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label htmlFor="email" style={{ fontSize: '14px' }}>Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#0c4b92',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar instruções'}
              </button>
            </form>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '14px', color: '#666', fontSize: '12px' }}>
        
        </div>
      </div>
    </div>
  );
}