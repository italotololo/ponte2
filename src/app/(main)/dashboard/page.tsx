'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Dados Simulados (em um projeto real, viriam de uma API ou contexto)
const dadosAluno = {
  turma: '5º Ano B',
  mediaGeral: 9,
  faltasTotais: 5,
  proximaAvaliacao: 'SARESP (18/11)',
};

const avisosRecentes = [
  { id: 1, titulo: 'Reunião de Pais e Mestres', data: '28/11', cor: 'bg-green-500' },
  { id: 2, titulo: 'Prova do SARESP', data: '18/11', cor: 'bg-yellow-500' },
  { id: 3, titulo: 'Passeio ao zoológico', data: '12/11', cor: 'bg-red-500' },
];

// -----------------------------------------------------------------
// COMPONENTES AUXILIARES
// -----------------------------------------------------------------

// Card de Resumo Rápido
type InfoCardProps = {
  titulo: string;
  valor: string | number;
  unidade: string;
  cor: string;
};

const InfoCard = ({ titulo, valor, unidade, cor }: InfoCardProps) => (
  <div className={`p-5 rounded-xl shadow-lg border-b-4 border-${cor}-500 bg-white transform transition duration-300 hover:scale-[1.02]`}>
    <p className="text-sm font-medium text-gray-500">{titulo}</p>
    <div className="flex items-end mt-1">
      <span className={`text-4xl font-bold text-${cor}-700`}>{valor}</span>
      <span className="ml-2 text-md text-gray-500">{unidade}</span>
    </div>
  </div>
);

// Card de Aviso Recente
type Aviso = {
  id: number;
  titulo: string;
  data: string;
  cor: string;
};

const AvisoCard = ({ aviso }: { aviso: Aviso }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-400 hover:bg-gray-100 transition duration-150">
    <div className={`w-3 h-3 rounded-full mr-3 ${aviso.cor}`}></div>
    <div className="flex-1">
      <p className="font-medium text-gray-800 truncate">{aviso.titulo}</p>
    </div>
    <span className="text-sm text-gray-500 ml-2">{aviso.data}</span>
  </div>
);


// -----------------------------------------------------------------
// PÁGINA PRINCIPAL DO DASHBOARD
// -----------------------------------------------------------------
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1. Lógica de Autenticação e Redirecionamento
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    // Tela de carregamento enquanto verifica a sessão
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <p className="text-lg font-semibold text-indigo-600">Verificando autenticação...</p>
        </div>
    );
  }

  // 2. Renderização do Conteúdo Principal
  if (session) {
    const nomeUsuario = session.user?.name || session.user?.email || 'Usuário';

    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Título Principal e Boas-Vindas */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            PONFAES 2.0
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Bem-vindo(a), <span className="text-indigo-600 font-semibold">Maria Eduarda</span>. Aqui está o resumo de hoje!
          </p>
          
          {/* 3. Cards de Resumo Rápido (Visão Geral) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <InfoCard 
              titulo="Média Geral Atual" 
              valor={dadosAluno.mediaGeral.toFixed(1)} 
              unidade="Pontos" 
              cor="blue" 
            />
            <InfoCard 
              titulo="Total de Faltas" 
              valor={dadosAluno.faltasTotais} 
              unidade="Aulas" 
              cor="red" 
            />
            <InfoCard 
              titulo="Próxima Avaliação" 
              valor={dadosAluno.proximaAvaliacao} 
              unidade="" 
              cor="indigo" 
            />
            <InfoCard 
              titulo="Turma" 
              valor={dadosAluno.turma} 
              unidade="" 
              cor="green" 
            />
          </div>
          
          {/* 4. Bloco de Avisos Recentes e Chamadas de Ação */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna 1: Avisos Recentes */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Avisos e Novidades Recentes</h2>
                <button 
                    onClick={() => router.push('/aviso')} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition duration-150"
                >
                    Ver Todos &rarr;
                </button>
              </div>
              
              <div className="space-y-3">
                {avisosRecentes.map(aviso => (
                  <AvisoCard key={aviso.id} aviso={aviso} />
                ))}
              </div>
              
              {avisosRecentes.length === 0 && (
                <p className="text-gray-500 text-center py-4">Nenhum aviso novo por enquanto.</p>
              )}
            </div>
            
            {/* Coluna 2: Chamadas de Ação Rápida */}
            <div className="lg:col-span-1 space-y-4">
                <div className="bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-200">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3">Acesso Rápido</h3>
                    <button 
                        onClick={() => router.push('/boletim')}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md mb-2"
                    >
                        Ver Boletim Completo
                    </button>
                    <button 
                        onClick={() => router.push('/frequencia')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 shadow-md"
                    >
                        Checar Frequência
                    </button>
                </div>
                
                {/* Dica do Dia (Opcional) */}
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Dica da Agenda:</p>
                    <p className="text-sm text-gray-600">
                        Não se esqueça da Reunião de Pais e Mestres no dia 15/05!
                    </p>
                </div>
            </div>
            
          </div>
          
        </div>
      </div>
    );
  }

  // Retorna null enquanto o useEffect redireciona
  return null;
}