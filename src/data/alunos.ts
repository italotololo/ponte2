// src/data/alunos.ts

// Dados de Referência
export const turmasSimuladas = ['7º Ano A', '7º Ano B', '8º Ano C'];
export const materiasSimuladas = ['Matemática', 'Português', 'História', 'Ciências'];

// Estrutura de dados inicial para as notas por matéria
const initialNotas = materiasSimuladas.reduce((acc, materia) => {
    acc[materia] = { nota: 0, faltas: 0 };
    return acc;
}, {} as Record<string, { nota: number; faltas: number }>);

// Função para Gerar 20 Alunos por Turma
let lastId = 100; 

const gerarAlunosPorTurma = (turma: string, quantidade: number) => {
    return Array.from({ length: quantidade }, (_, index) => {
        lastId += 1;
        const nome = `Aluno Teste ${index + 1} (${turma})`;
        return {
            id: lastId,
            nome: nome,
            turma: turma,
            // Clonamos para garantir que cada aluno tenha seu próprio objeto de notas
            notas: JSON.parse(JSON.stringify(initialNotas)), 
        };
    });
};

// Geração da Lista Completa de Alunos (60 alunos no total)
export const dadosAlunosSimulados = turmasSimuladas.flatMap(turma => 
    gerarAlunosPorTurma(turma, 20) 
);

// Tipagem
export type Aluno = (typeof dadosAlunosSimulados)[number];
export type Campo = 'nota' | 'faltas';