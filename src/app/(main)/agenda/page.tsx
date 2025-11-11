'use client';

import React, { useState } from 'react';

// Dados simulados do mês e eventos
const MES_ATUAL = 'Novembro';
const ANO_ATUAL = 2025;
const DIA_INICIO_MES = 6; // 1º de Novembro cai em um Sábado (Índice 6, considerando Domingo=0)
const DIAS_DO_MES = 31;
const DIAS_DA_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Simulação dos eventos (em um sistema real, viria de uma API)
const eventosDoMes: Evento[] = [
  { dia: 5, nome: 'Prazo: Trabalho de História', tipo: 'prazo', cor: 'red' },
  { dia: 7, nome: 'Prova de Matemática', tipo: 'prova', cor: 'indigo' },
  { dia: 15, nome: 'Reunião de Pais e Mestres', tipo: 'reuniao', cor: 'green' },
  { dia: 28, nome: 'SARESP', tipo: 'prova', cor: 'indigo' },
  { dia: 26, nome: 'Início do 3º Bimestre', tipo: 'aviso', cor: 'blue' },
  { dia: 31, nome: 'Entrega Final do Portfólio', tipo: 'prazo', cor: 'red' },
];

// Mapeamento de cor e estilos para os tipos de evento
const TIPOS_EVENTO = {
  prazo: { label: 'Prazo/Entrega', class: 'bg-red-500', dot: 'bg-red-500' },
  prova: { label: 'Avaliação', class: 'bg-indigo-500', dot: 'bg-indigo-500' },
  reuniao: { label: 'Reunião', class: 'bg-green-500', dot: 'bg-green-500' },
  aviso: { label: 'Aviso Escolar', class: 'bg-blue-500', dot: 'bg-blue-500' },
};

// Componente para um dia do calendário
type Evento = {
  dia: number;
  nome: string;
  tipo: keyof typeof TIPOS_EVENTO;
  cor: string;
};

type DiaCalendarioProps = {
  dia: number;
  isAtual: boolean;
  eventos: Evento[];
};

const DiaCalendario: React.FC<DiaCalendarioProps> = ({ dia, isAtual, eventos }) => {
  const hasEventos = eventos.length > 0;
  
  // Estilo do dia, se for o dia de hoje (simulando 15 como o dia atual)
  const baseClasses = isAtual 
    ? 'bg-indigo-100 border-indigo-500 text-indigo-800 font-bold' 
    : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50';

  return (
    <div className={`p-2 h-28 border rounded-lg flex flex-col transition duration-150 ease-in-out ${baseClasses}`}>
      
      {/* Número do Dia */}
      <div className={`text-lg self-end ${hasEventos ? 'font-bold' : ''}`}>
        {dia}
      </div>
      
      {/* Indicadores de Evento */}
      <div className="flex flex-col mt-1 space-y-0.5 overflow-y-auto">
        {eventos.map((evento, index) => {
          const tipo = TIPOS_EVENTO[evento.tipo];
          return (
            <div key={index} className="flex items-center text-xs space-x-1">
              <span className={`w-1.5 h-1.5 rounded-full ${tipo.dot}`}></span>
              <span className={`text-gray-700 truncate ${evento.tipo === 'prova' ? 'font-semibold text-indigo-700' : ''}`}>
                {evento.nome}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function AgendaPage() {
  
  // Array para construir os dias (incluindo espaços vazios no início)
  const dias: (number | null)[] = Array.from({ length: DIA_INICIO_MES }, () => null); // Espaços vazios antes do dia 1
  for (let d = 1; d <= DIAS_DO_MES; d++) {
    dias.push(d);
  }

  // Simular o dia atual (Apenas para visualização no protótipo)
  const diaAtual = 11; 
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Título e Navegação (Simulada) */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-indigo-200 pb-2">
          AGENDA ESCOLAR - {MES_ATUAL} {ANO_ATUAL}
        </h1>
        
        {/* Bloco de Legenda */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Legenda de Eventos</h2>
            <div className="flex flex-wrap gap-4">
                {Object.keys(TIPOS_EVENTO).map((key) => {
                    const tipo = TIPOS_EVENTO[key as keyof typeof TIPOS_EVENTO];
                    return (
                        <div key={key} className="flex items-center space-x-2 text-sm text-gray-700">
                            <span className={`w-3 h-3 rounded-full ${tipo.dot}`}></span>
                            <span>{tipo.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Títulos dos Dias da Semana */}
        <div className="grid grid-cols-7 gap-3 mb-3">
          {DIAS_DA_SEMANA.map(dia => (
            <div key={dia} className="text-center font-semibold text-gray-600">
              {dia}
            </div>
          ))}
        </div>

        {/* Grade do Calendário */}
        <div className="grid grid-cols-7 gap-3">
          {dias.map((dia, index) => {
            if (dia === null) {
              return <div key={`empty-${index}`} className="h-28"></div>; // Espaços vazios
            }
            
            // Filtra eventos para o dia atual
            const eventosDoDia = eventosDoMes.filter(e => e.dia === dia);
            
            return (
              <DiaCalendario 
                key={dia}
                dia={dia}
                isAtual={dia === diaAtual}
                eventos={eventosDoDia}
              />
            );
          })}
        </div>
        
        {/* Rodapé ou Chamada para Ação */}
        <div className="mt-8 text-center text-gray-600">
            <p>Os eventos podem ser alterados pela escola. Verifique sempre o **Avisos** para notificações importantes.</p>
        </div>

      </div>
    </div>
  );
}