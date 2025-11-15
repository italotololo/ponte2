import React from 'react';

// Dados simulados do aluno (Maria Eduarda Silva) - em um projeto real, viria do contexto
const aluno = {
  nome: 'Renata Hyuga Kishimoto',
  turma: '5º Ano X',
  periodo: '3º Bimestre / 2025',
};

// Dados simulados de frequência por disciplina
const frequencia = [
  {
    disciplina: 'Português',
    aulasDadas: 20,
    faltas: 2,
    percentualPresenca: 90.0 // (18/20) * 100
  },
  {
    disciplina: 'Matemática',
    aulasDadas: 20,
    faltas: 3,
    percentualPresenca: 85.0,
  },
  {
    disciplina: 'História',
    aulasDadas: 10,
    faltas: 0,
    percentualPresenca: 100.0,
  },
  {
    disciplina: 'Ciências',
    aulasDadas: 10,
    faltas: 0, // Exemplo de falta alta
    percentualPresenca: 100.0, 
  },
  {
    disciplina: 'Geografia',
    aulasDadas: 8,
    faltas: 1,
    percentualPresenca: 96.0,
  },
];

// Função para determinar a cor do badge de faltas
const getFaltaBadgeClass = (percentual: number) => {
  if (percentual < 75) {
    return 'bg-red-100 text-red-800'; // Risco de reprovação por falta
  } else if (percentual < 90) {
    return 'bg-yellow-100 text-yellow-800'; // Atenção
  } else {
    return 'bg-green-100 text-green-800'; // Satisfatório
  }
};

// Calcular o total de faltas e o percentual geral
const totalFaltas = frequencia.reduce((acc, item) => acc + item.faltas, 0);
const totalAulas = frequencia.reduce((acc, item) => acc + item.aulasDadas, 0);
const percentualGeral = totalAulas > 0 ? ((totalAulas - totalFaltas) / totalAulas) * 100 : 0;


export default function FrequenciaPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        
        {/* Título e Informações do Aluno */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
          ACOMPANHAMENTO DE FREQUÊNCIA
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-8">
          <p><span className="font-semibold">Aluno(a):</span> {aluno.nome}</p>
          <p><span className="font-semibold">Turma:</span> {aluno.turma}</p>
          <p><span className="font-semibold">Período:</span> {aluno.periodo}</p>
        </div>

        {/* Resumo Geral da Frequência */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-8 shadow-md flex justify-between items-center flex-wrap">
          <h2 className="text-xl font-bold text-indigo-700 mb-2 w-full md:w-auto">Resumo Geral</h2>
          <div className="flex flex-col sm:flex-row gap-6 mt-2 md:mt-0">
            <p className="text-lg font-semibold text-indigo-800">
                Total de Faltas no Período: 
                <span className="ml-2 text-red-600 text-2xl">{totalFaltas}</span>
            </p>
            <p className="text-lg font-semibold text-indigo-800">
                Presença Média: 
                <span className={`ml-2 text-2xl font-bold ${percentualGeral < 75 ? 'text-red-600' : 'text-green-600'}`}>
                    {percentualGeral.toFixed(1)}%
                </span>
            </p>
          </div>
        </div>

        {/* Tabela de Frequência */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhamento por Disciplina</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200" aria-label="Tabela de Frequência do Aluno">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disciplina
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aulas Dadas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faltas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Presença
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {frequencia.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.disciplina}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.aulasDadas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">
                    {item.faltas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getFaltaBadgeClass(item.percentualPresenca)}`}>
                      {item.percentualPresenca.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Observações sobre Reprovação */}
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 text-sm" role="note">
          <p className="font-semibold mb-1">Limite Legal:</p>
          <p>Lembramos que a frequência mínima exigida por lei é de 75%. O percentual abaixo deste valor em qualquer disciplina pode levar à retenção no ano letivo.</p>
        </div>

      </div>
    </div>
  );
}