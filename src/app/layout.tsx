import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers'; // Importa o provedor

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextAuthProvider> 
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}