'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- IMPORTAÇÃO CORRIGIDA ---
import { 
    turmasSimuladas, 
    materiasSimuladas, 
    dadosAlunosSimulados, 
} from '@/data/alunos'; // VERIFIQUE ESTE CAMINHO (@/data/alunos)

// --- Tipagem (Ajuste o caminho se tiver vindo de @/data/alunos) ---
type Aluno = (typeof dadosAlunosSimulados)[number];
type Campo = 'nota' | 'faltas';


// --- Componente Principal ---
export default function LancamentoNotasPage() { 
    const { data: session, status } = useSession();
    const router = useRouter();

    // Estados de Interação
    const [turmaSelecionada, setTurmaSelecionada] = useState(turmasSimuladas[0]);
    const [materiaSelecionada, setMateriaSelecionada] = useState(materiasSimuladas[0]);
    const [alunos, setAlunos] = useState<Aluno[]>([]); 
    const [mensagem, setMensagem] = useState('');

    // Efeito para carregar e filtrar os alunos quando a turma muda
    useEffect(() => {
        // Filtra os alunos para a turma selecionada
        const alunosDaTurma = dadosAlunosSimulados.filter(a => a.turma === turmaSelecionada);
        setAlunos(alunosDaTurma);
    }, [turmaSelecionada]);


    // 1. Carregando
    if (status === 'loading') {
        return <h1 style={{ padding: '20px', textAlign: 'center' }}>Verificando Permissões...</h1>;
    }

    // 2. Proteção de Rota
    if (status === 'authenticated' && session.user?.role !== 'professor') {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1 style={{ color: '#dc3545' }}>Acesso Negado</h1>
                <p>Você não tem permissão para acessar esta área.</p>
                <button 
                    onClick={() => router.push('/dashboard')}
                    style={{ padding: '10px 20px', marginTop: '15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Voltar
                </button>
            </div>
        );
    }

    // --- Funções de Interação (CORRIGIDAS) ---
    const handleTurmaChange = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        const novaTurma = e.target.value;
        setTurmaSelecionada(novaTurma);
        
        // Filtra os alunos para a nova turma
        const alunosDaTurma = dadosAlunosSimulados.filter(a => a.turma === novaTurma);
        setAlunos(alunosDaTurma);
        setMensagem('');
    };

    const handleMateriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMateriaSelecionada(e.target.value);
        setMensagem('');
    };
    
    // ESTA FUNÇÃO É CRUCIAL PARA ATUALIZAR OS INPUTS
    const handleInputChange = (id: number, campo: Campo, valor: string) => {
        setAlunos(prevAlunos => 
            prevAlunos.map(aluno => {
                if (aluno.id === id) {
                    const novoValor = parseFloat(valor) || 0;
                    
                    return {
                        ...aluno,
                        notas: {
                            ...aluno.notas,
                            [materiaSelecionada]: {
                                ...aluno.notas[materiaSelecionada],
                                [campo]: novoValor
                            }
                        }
                    };
                }
                return aluno;
            })
        );
    };

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        console.log(`Dados da turma ${turmaSelecionada} e matéria ${materiaSelecionada} a serem salvos:`, alunos);
        
        // Simulação de salvamento
        setMensagem('Lançamento de notas/faltas salvo com sucesso! (Simulação)');
    };


    // 3. Conteúdo do Professor (Acesso Permitido)
    if (status === 'authenticated' && session?.user?.role === 'professor') {
        return (
            <div style={{ padding: '20px' }}>
                <h1>Área do Professor - Lançamento de Notas e Frequência</h1>
                <p style={{ marginBottom: '20px' }}>Bem-vindo, {session?.user?.name}.</p>

                {mensagem && <p style={{ color: '#28a745', border: '1px solid #28a745', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{mensagem}</p>}

                {/* --- SELETORES DE TURMA E MATÉRIA (RESTAURADOS) --- */}
                <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                    
                    <div>
                        <label htmlFor="turma" style={{ marginRight: '10px', fontWeight: 'bold' }}>Turma:</label>
                        <select
                            id="turma"
                            value={turmaSelecionada}
                            onChange={handleTurmaChange} // <-- ANEXADO!
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            {turmasSimuladas.map(turma => (
                                <option key={turma} value={turma}>{turma}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="materia" style={{ marginRight: '10px', fontWeight: 'bold' }}>Matéria:</label>
                        <select
                            id="materia"
                            value={materiaSelecionada}
                            onChange={handleMateriaChange} // <-- ANEXADO!
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            {materiasSimuladas.map(materia => (
                                <option key={materia} value={materia}>{materia}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* --- FIM SELETORES --- */}

                {/* Formulário de Lançamento (RESTAURADO) */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                        <h3>Lançamento para {materiaSelecionada} em {turmaSelecionada} ({alunos.length} Alunos)</h3>
                        
                        {alunos.length === 0 ? (
                            <p>Nenhum aluno encontrado para esta turma.</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={tableHeaderStyle}>Nome do Aluno</th>
                                        <th style={tableHeaderStyle}>Nota (0-10)</th>
                                        <th style={tableHeaderStyle}>Faltas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunos.map(aluno => (
                                        <tr key={aluno.id}>
                                            <td style={tableCellStyle}>{aluno.nome}</td>
                                            <td style={tableCellStyle}>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="10"
                                                    step="0.1"
                                                    value={aluno.notas[materiaSelecionada].nota}
                                                    onChange={(e) => handleInputChange(aluno.id, 'nota', e.target.value)}
                                                    style={inputStyle}
                                                />
                                            </td>
                                            <td style={tableCellStyle}>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={aluno.notas[materiaSelecionada].faltas}
                                                    onChange={(e) => handleInputChange(aluno.id, 'faltas', e.target.value)}
                                                    style={inputStyle}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        
                        <button 
                            type="submit"
                            disabled={alunos.length === 0}
                            style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: alunos.length === 0 ? 0.6 : 1 }}
                        >
                            Salvar Lançamentos
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    
    return null; 
}


// --- Estilos Inline (Deixados fora do componente, mas ok) ---

const tableHeaderStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const tableCellStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #ddd',
};

const inputStyle: React.CSSProperties = {
    padding: '6px',
    width: '80px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'center',
};