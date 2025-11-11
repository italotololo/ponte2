// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        
        // 1. SIMULAÇÃO: Conta de PROFESSOR
        if (credentials?.email === 'professor@escola.com' && credentials?.password === 'senha_prof') {
          const user = { 
            id: "2", 
            name: "Prof. Alberto",
            email: "professor@escola.com", 
            role: "professor"
          };
          console.log("[Authorize] Professor Logged In:", user); // DEBUG
          return user;
        }

        // 2. SIMULAÇÃO: Conta de DIRETOR
        if (credentials?.email === 'diretor@escola.com' && credentials?.password === 'senha_dir') {
          const user = { 
            id: "2", 
            name: "Dir. Maria",
            email: "diretor@escola.com", 
            role: "diretor"
          };
          console.log("[Authorize] Diretor Logged In:", user); // DEBUG
          return user;
        }
        
        // 3. SIMULAÇÃO: Conta de ALUNO
        if (credentials?.email === 'teste@exemplo.com' && credentials?.password === 'senha123') {
          const user = { 
            id: "1", 
            name: "Maria Eduarda",
            email: "teste@exemplo.com", 
            role: "aluno"
          };
          console.log("[Authorize] Aluno Logged In:", user); // DEBUG
          return user;
        }
        
        console.log("[Authorize] Invalid Credentials"); // DEBUG
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  
  callbacks: {
    
    // 1. O callback 'jwt' é chamado PRIMEIRO
    async jwt({ token, user }: { token: any; user?: any }) {
      // O 'user' só está disponível na primeira vez (no login)
      if (user) {
        console.log("[JWT Callback] User object received:", user); // DEBUG
        
        // TypeScript pode não saber sobre 'role' no 'user', então usamos 'as any'
        const u = user as any; 
        token.role = u.role;
        token.name = u.name;
      }
      
      console.log("[JWT Callback] Token returning:", token); // DEBUG
      return token;
    },
    
    // 2. O callback 'session' é chamado DEPOIS
    async session({ session, token }: { session: any; token: any }) {
      console.log("[Session Callback] Token received:", token); // DEBUG

      // Passa os dados do TOKEN (que tem o role) para a SESSÃO
      // (O useSession() lê este objeto 'session')
      session.user.role = token.role as string; 
      session.user.name = token.name as string;

      console.log("[Session Callback] Session returning:", session); // DEBUG
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };