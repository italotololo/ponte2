// src/types/next-auth.d.ts

// Importa os tipos originais do next-auth
import 'next-auth';
import 'next-auth/jwt';

// Declara um módulo para estender os tipos existentes
declare module 'next-auth' {
  /**
   * Estende a interface 'Session' padrão.
   * Agora, 'session.user' terá a propriedade 'role'.
   */
  interface Session {
    user: {
      /** O 'role' (função) do usuário (ex: 'aluno' ou 'professor') */
      role?: string;
    } & DefaultSession['user']; // Mantém as propriedades padrão (name, email, image)
  }

  /**
   * Estende a interface 'User' padrão.
   * Isso permite que o objeto 'user' (retornado pelo 'authorize')
   * tenha a propriedade 'role'.
   */
  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Estende o Token JWT para que ele possa carregar o 'role'
   * entre o callback 'jwt' e o 'session'.
   */
  interface JWT {
    role?: string;
  }
}