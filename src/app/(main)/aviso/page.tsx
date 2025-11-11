import React from 'react';

// Dados simulados de avisos para a demonstração
const avisos = [
  {
    id: 1,
    titulo: 'SARESP',
    data: '07/11/2025',
    urgente: true,
    conteudo: 'Atenção, alunos do 2º ano!Vamos erguer o Saresp! A prova será no dia 18/11. Fiquem atentos aos detalhes divulgados pela coordenação.',
    autor: 'Direção Escolar',
  },
  {
    id: 2,
    titulo: 'REUNIÃO GERAL DE PAIS E MESTRES',
    data: '10/11/2025',
    urgente: false,
    conteudo: 'A Reunião Geral do 4º Bimestre será realizada no dia 28/11, às 10h00, no Auditório da Escola. Contamos com a presença de todos para discutir o desempenho final dos alunos.',
    autor: 'Coordenação Escolar',
  },
  {
    id: 3,
    titulo: 'PASSEIO AO ZOOLÓGICO',
    data: '05/11/2025',
    urgente: false,
    conteudo: 'Lembramos a todos que dia 12/11 será nosso passeio ao zoológico.',
    autor: 'Direção Escolar',
  },
];

// Tipo para um aviso
type Aviso = {
  id: number;
  titulo: string;
  data: string;
  urgente: boolean;
  conteudo: string;
  autor: string;
};

// Componente para um único cartão de aviso
const AvisoCard = ({ aviso }: { aviso: Aviso }) => {
  const isUrgente = aviso.urgente;

  // Classes de estilo para destacar a urgência (melhoria de usabilidade solicitada)
  const cardClasses = isUrgente
    ? 'bg-red-100 border-l-4 border-red-600 shadow-xl'
    : 'bg-white border-l-4 border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300';

  const titleClasses = isUrgente
    ? 'text-red-700 font-extrabold text-lg uppercase'
    : 'text-gray-900 font-semibold text-base';

  return (
    <div className={`p-4 rounded-lg mb-6 ${cardClasses}`} role={isUrgente ? 'alert' : 'region'}>
      <h3 className={titleClasses}>
        {isUrgente && <span className="mr-2">🚨</span>}
        {aviso.titulo}
      </h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">
        Publicado em: {aviso.data} | Por: {aviso.autor}
      </p>
      <p className="text-gray-700 leading-relaxed">
        {aviso.conteudo}
      </p>
    </div>
  );
};

export default function AvisoPage() {
  return (
    // Estrutura principal com foco em acessibilidade e responsividade
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Título Principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-indigo-200 pb-2">
          CENTRAL DE AVISOS
        </h1>

        {/* Mensagem de status (ex: número de avisos) */}
        <p className="text-lg text-indigo-600 mb-6 font-medium">
          Você tem {avisos.length} avisos recentes.
        </p>

        {/* Lista de Avisos */}
        <section aria-labelledby="latest-announcements">
          <h2 id="latest-announcements" className="sr-only">Avisos Recentes da Escola</h2>
          {avisos.map((aviso) => (
            <AvisoCard key={aviso.id} aviso={aviso} />
          ))}
        </section>

        {/* Rodapé da seção (opcional) */}
        <div className="text-center mt-10 p-4 border-t border-gray-200">
          <button 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
            aria-label="Ver todos os avisos arquivados"
          >
            Ver Arquivo de Avisos Antigos &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}