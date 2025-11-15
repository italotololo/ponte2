'use client';

import React, { useState } from 'react';

// -----------------------------------------------------------------
// 1. DADOS E TIPAGEM
// -----------------------------------------------------------------

type TipoUsuario = 'aluno' | 'professor' | 'responsavel';

type Comentario = {
  id: number;
  autor: string;
  tipoAutor: TipoUsuario | string;
  conteudo: string;
  data: string;
  avatarUrl: string;
};

type Post = {
  id: number;
  autor: string;
  tipoAutor: TipoUsuario | string;
  titulo: string;
  conteudo: string;
  data: string;
  avatarUrl: string;
  comentarios: Comentario[];
};

const currentUser = {
  nome: 'Renata Hyuga Kishimoto',
  tipo: 'aluno' as TipoUsuario, // Cast para TipoUsuario
  avatarUrl: '/renata2.jpg', 
};

const initialPosts: Post[] = [
  // ... Seus dados de posts, usando /avatars/professor.png e /avatars/aluno.png
  // Certifique-se de que o tipoAutor está como 'aluno' ou 'professor'
  // ...
  {
    id: 1,
    autor: 'Prof. Wagner Lima',
    tipoAutor: 'professor',
    titulo: 'Exercícios de matemática',
    conteudo: 'Pessoal, estou à disposição para tirar dúvidas nos exercícios de matemática.',
    data: '03/11/2025 às 10:30',
    avatarUrl: '/wagner.jpg',
    comentarios: [
      {
        id: 101,
        autor: 'Jessica Alves',
        tipoAutor: 'aluno',
        conteudo: 'Pro, poderia me ajudar com a questão 5 da página 42? estou com dificuldades para entender.',
        data: '03/11/2025 às 11:15',
        avatarUrl: '/jessica.jpg',
      },
      // ...
    ],
  },
  {
    id: 2,
    autor: 'Reginaldo Rocha',
    tipoAutor: 'aluno',
    titulo: 'Uniforme para doação',
    conteudo: 'Tenho um uniforme da escola para doar quem quiser me procura na entrada!"...',
    data: '01/11/2025 às 17:00',
    avatarUrl: '/reginaldo.jpg',
    comentarios: [
      {
        id: 101,
        autor: 'Israel Palestino',
        tipoAutor: 'aluno',
        conteudo: 'qual o tamanho ???',
        data: '03/11/2025 às 11:15',
        avatarUrl: '/israel.png',
      },
      // ...
    ],
  },
  {
    id: 3,
    autor: 'João Paulo',
    tipoAutor: 'responsavel',
    titulo: 'O Henzo está de atestado',
    conteudo: 'Professora, o Henzo pegou 7 dias de atestado, amanhã levo o atestado na escola.',
    data: '05/11/2025 às 10:45',
    avatarUrl: '/joao.jpg',
    comentarios: [
      // ...
    ],
  },
];

// -----------------------------------------------------------------
// 2. COMPONENTES INTERNOS
// -----------------------------------------------------------------

const badgeClasses: Record<TipoUsuario, string> = {
  aluno: 'bg-blue-100 text-blue-800',
  professor: 'bg-red-100 text-red-800',
  responsavel: 'bg-green-100 text-green-800',
};

const UserBadge: React.FC<{ tipo: TipoUsuario | string }> = ({ tipo }) => {
  const label = tipo === 'aluno' ? 'Aluno' : tipo === 'professor' ? 'Professor' : tipo;
  // Assumimos que o tipo é válido para a classe, ou usamos um fallback
  const className = badgeClasses[tipo as TipoUsuario] || 'bg-gray-100 text-gray-800'; 
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
};

const ComentarioCard: React.FC<{ comentario: Comentario }> = ({ comentario }) => (
  // ... Seu código JSX do ComentarioCard
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg mb-2 border border-gray-100">
        <img
            className="h-8 w-8 rounded-full object-cover"
            src={comentario.avatarUrl}
            alt={`Avatar de ${comentario.autor}`}
        />
        <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
                <p className="font-semibold text-gray-800 text-sm">{comentario.autor}</p>
                {/* Garantir que o tipo é passado corretamente */}
                <UserBadge tipo={comentario.tipoAutor as TipoUsuario} /> 
                <span className="text-xs text-gray-500">{comentario.data}</span>
            </div>
            <p className="text-sm text-gray-700">{comentario.conteudo}</p>
        </div>
    </div>
);

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  // ... Seu código JSX do PostCard
  // ... (use o código completo da função PostCard que você já tinha)
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6 border border-gray-200">
        {/* Informações do Autor do Post */}
        <div className="flex items-center space-x-4 mb-4 pb-3 border-b border-gray-100">
            <img
                className="h-10 w-10 rounded-full object-cover"
                src={post.avatarUrl}
                alt={`Avatar de ${post.autor}`}
            />
            <div>
                <h3 className="font-bold text-gray-900 text-lg">{post.autor}</h3>
                <div className="flex items-center space-x-2 mt-1">
                    {/* Garantir que o tipo é passado corretamente */}
                    <UserBadge tipo={post.tipoAutor as TipoUsuario} /> 
                    <span className="text-sm text-gray-500">{post.data}</span>
                </div>
            </div>
        </div>

        {/* Conteúdo do Post */}
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">{post.titulo}</h2>
        <p className="text-gray-800 leading-relaxed mb-4">
            {post.conteudo}
        </p>
        
        {/* Seção de Comentários e Formulários */}
        {/* ... (Todo o restante do JSX do PostCard) ... */}
         {post.comentarios.length > 0 && (
            <div className="mt-4 border-t pt-4 border-gray-100">
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-3"
                    aria-expanded={showComments}
                    aria-controls={`comments-for-post-${post.id}`}
                >
                    {showComments ? 'Ocultar Comentários' : `Ver ${post.comentarios.length} Comentários`}
                </button>

                {showComments && (
                    <div id={`comments-for-post-${post.id}`} className="mt-3 space-y-2">
                    {post.comentarios.map((comentario) => (
                        <ComentarioCard key={comentario.id} comentario={comentario} />
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <textarea 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                            rows={2} 
                            placeholder="Escreva um comentário..."
                            aria-label="Campo para escrever um novo comentário"
                        ></textarea>
                        <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150">
                            Comentar
                        </button>
                    </div>
                    </div>
                )}
            </div>
        )}

        {post.comentarios.length === 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
                <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                    rows={2} 
                    placeholder="Escreva o primeiro comentário..."
                    aria-label="Campo para escrever um novo comentário"
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150">
                    Comentar
                </button>
            </div>
        )}
    </div>
  );
};


// -----------------------------------------------------------------
// 3. PÁGINA PRINCIPAL
// -----------------------------------------------------------------

export default function ComunicacaoPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleNewPost = () => {
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
      alert('Por favor, preencha o título e o conteúdo da postagem.');
      return;
    }
    const newPost: Post = { // Tipado para consistência
      id: posts.length + 1,
      autor: `${currentUser.nome} (${currentUser.tipo === 'aluno' ? 'Aluno' : 'Professor'})`,
      tipoAutor: currentUser.tipo,
      titulo: newPostTitle,
      conteudo: newPostContent,
      data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      avatarUrl: currentUser.avatarUrl,
      comentarios: [],
    };
    setPosts([newPost, ...posts]); // Adiciona o novo post no topo
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Título Principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-indigo-200 pb-2">
          MURAL DE COMUNICAÇÃO 5º X
        </h1>

        {/* Formulário para Nova Postagem */}
        <div className="bg-white shadow-lg rounded-lg p-5 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Criar Nova Postagem</h2>
          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Título da sua postagem"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            aria-label="Título da nova postagem"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            placeholder="Escreva sua postagem aqui..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            aria-label="Conteúdo da nova postagem"
          ></textarea>
          <button 
            onClick={handleNewPost}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150 font-semibold"
          >
            Publicar
          </button>
        </div>

        {/* Lista de Postagens */}
        <section aria-labelledby="communication-forum-posts">
          <h2 id="communication-forum-posts" className="sr-only">Postagens do Mural de Comunicação</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600 text-center text-lg mt-10">Nenhuma postagem ainda. Seja o primeiro a iniciar uma conversa!</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </section>

      </div>
    </div>
  );
}