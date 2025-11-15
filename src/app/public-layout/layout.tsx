// app/forgot-password/layout.tsx
import React from 'react';

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  // Sem sidebar, apenas renderiza o conteúdo da rota
  return <>{children}</>;
}