import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// O objeto de configuração. Ele não precisa ser exportado.
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
       credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Lógica de autenticação com seu banco de dados
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
// Isso é o que o Next.js App Router espera.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };