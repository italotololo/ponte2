// src/app/api/auth/[...nextauth]/authOptions.ts
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
        if (credentials?.email === 'teste@exemplo.com' && credentials?.password === 'senha123') {
          const user = {
            id: "1",
            name: "Maria Eduarda",
            email: "teste@exemplo.com",
            role: "aluno",
          };
          console.log("[Authorize] Aluno Logged In:", user);
          return user;
        }
        console.log("[Authorize] Invalid Credentials");
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        const u = user as any;
        token.role = u.role;
        token.name = u.name;
      }
      console.log("[JWT Callback] Token returning:", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role as string;
      session.user.name = token.name as string;
      console.log("[Session Callback] Session returning:", session);
      return session;
    },
  },
};