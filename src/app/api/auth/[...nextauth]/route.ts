import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// O objeto de configuração, que define os provedores de autenticação
export const authOptions = {
  // Array de provedores. Você pode adicionar outros, como Google, GitHub, etc.
  providers: [
    CredentialsProvider({
      // O nome do provedor, usado na função signIn() da página de login
      name: "Credentials",
      // Campos que o formulário de login irá enviar
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      // A função principal que lida com a lógica de autenticação
      async authorize(credentials) {
        // Lógica de verificação das credenciais.
        // Aqui é onde você se conectaria ao seu banco de dados para
        // encontrar o usuário e verificar a senha.
        
        // Exemplo simples com credenciais fixas:
        if (credentials?.email === 'teste@exemplo.com' && credentials?.password === 'senha123') {
          // Retorne um objeto de usuário. As propriedades 'id' e 'email' são essenciais.
          return { id: "1", name: "Usuário Teste", email: "teste@exemplo.com" };
        }
        
        // Se a autenticação falhar, retorne null.
        return null;
      },
    }),
  ],
  // Páginas customizadas do NextAuth. Isso direciona o usuário
  // para sua página de login em vez da página padrão do NextAuth.
  pages: {
    signIn: '/login',
  },
};

// O manipulador que processa as requisições
const handler = NextAuth(authOptions);

// Exporta os métodos GET e POST do manipulador.
// O Auth.js usa essas exportações para lidar com todas as suas rotas.
export { handler as GET, handler as POST };