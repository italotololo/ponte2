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
        if (credentials?.email === 'teste@exemplo.com' && credentials?.password === 'senha123') {
          return { id: "1", name: "Usuário Teste", email: "teste@exemplo.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};

// Exporta o manipulador de rota diretamente.
// Isso é o que a Vercel e o Next.js App Router esperam.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };