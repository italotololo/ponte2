import React from 'react';

// Dados simulados de notas do aluno
const aluno = {
  nome: 'Maria Eduarda Silva',
  turma: '7º Ano B',
  ra: '123456789',
  periodo: '2º Bimestre / 2025',
};

const boletim = [
  {
    disciplina: 'Português',
    notas: [7.5, 8.0, 7.0],
    media: 7.5,
    status: 'Aprovado',
    faltas: 2,
  },
  {
    disciplina: 'Matemática',
    notas: [6.0, 6.5, 7.0],
    media: 6.5,
    status: 'Aprovado',
    faltas: 3,
  },
  {
    disciplina: 'História',
    notas: [9.0, 8.5, 9.5],
    media: 9.0,
    status: 'Aprovado',
    faltas: 0,
  },
  {
    disciplina: 'Ciências',
    notas: [5.0, 6.0, 5.5],
    media: 5.5,
    status: 'Recuperação', // Exemplo de status
    faltas: 4,
  },
  {
    disciplina: 'Geografia',
    notas: [7.0, 7.0, 7.0],
    media: 7.0,
    status: 'Aprovado',
    faltas: 1,
  },
];

// Função para calcular a média geral do boletim
type BoletimItem = {
  disciplina: string;
  notas: number[];
  media: number;
  status: string;
  faltas: number;
};

const calcularMediaGeral = (boletim: BoletimItem[]) => {
  if (boletim.length === 0) return 0;
  const somaMedias = boletim.reduce((acc, item) => acc + item.media, 0);
  return (somaMedias / boletim.length).toFixed(1);
};

const mediaGeral = calcularMediaGeral(boletim);
const statusGeral = boletim.some(item => item.status === 'Recuperação' || item.status === 'Reprovado')
  ? 'Atenção Necessária'
  : 'Bom Desempenho';

export default function BoletimPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        
        {/* Título e Informações do Aluno */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
          BOLETIM ESCOLAR
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-8">
          <div>
            <p><span className="font-semibold">Aluno(a):</span> {aluno.nome}</p>
            <p><span className="font-semibold">Turma:</span> {aluno.turma}</p>
          </div>
          <div>
            <p><span className="font-semibold">RA:</span> {aluno.ra}</p>
            <p><span className="font-semibold">Período:</span> {aluno.periodo}</p>
          </div>
        </div>

        {/* Resumo Geral */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-8 shadow-md">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Resumo Geral do Período</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center text-indigo-800">
            <p className="text-lg font-semibold">Média Geral: <span className="text-indigo-900 text-2xl">{mediaGeral}</span></p>
            <p className="text-lg font-semibold">
              Situação: 
              <span className={`ml-2 px-3 py-1 rounded-full text-white ${statusGeral === 'Bom Desempenho' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                {statusGeral}
              </span>
            </p>
          </div>
        </div>

        {/* Tabela de Notas */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhamento por Disciplina</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disciplina
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notas (P1, P2, P3)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Média
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faltas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {boletim.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.disciplina}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.notas.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.media.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Aprovado' ? 'bg-green-100 text-green-800' : 
                      item.status === 'Recuperação' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.faltas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Observações ou Legendas (Opcional) */}
        <div className="mt-8 text-gray-600 text-sm">
          <p><span className="font-semibold">Observações:</span> A média para aprovação é 6.0.</p>
          <p>Para mais detalhes sobre as notas, entre em contato com a secretaria.</p>
        </div>

      </div>
    </div>
  );
}