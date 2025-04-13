import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/saudeBemEstarProfessor.css';
import api from '../services/api'; 

interface Estatisticas {
  [topico: string]: {
    positivo: number;
    neutro: number;
    negativo: number;
  };
}

interface AlunoAlerta {
  aluno: string;
  respostas: { [topico: string]: string };
  score: number;
  status: 'OK' | 'Alerta' | 'Crítico';
}


const labels = ['😊 Positivo', '😐 Neutro', '😢 Negativo'];
const cores = ['#4CAF50', '#FFC107', '#F44336'];

const SaudeBemEstarProfessor: React.FC = () => {
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({});
  const [alunosAlerta, setAlunosAlerta] = useState<AlunoAlerta[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const response = await api.get('/bem-estar/estatisticas');
        setEstatisticas(response.data);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setCarregando(false);
      }
    };

    const fetchAlunosAlerta = async () => {
      try {
        const response = await api.get('/bem-estar/respostas-alunos');
        setAlunosAlerta(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos em alerta:', error);
      }
    };

    fetchEstatisticas();
    fetchAlunosAlerta();
  }, []);

  const getDoughnutData = (topico: string) => {
    const dados = estatisticas[topico] || { positivo: 0, neutro: 0, negativo: 0 };
    return {
      labels,
      datasets: [
        {
          data: [dados.positivo, dados.neutro, dados.negativo],
          backgroundColor: cores,
          borderWidth: 1,
        }
      ]
    };
  };

  // const alunosEmAlerta = respostasAlunos.filter(aluno => {
  //   const pontuacoes = Object.values(aluno.respostas).map(resposta => {
  //     console.log(resposta);
  //     if (resposta === 'positivo') return 1;
  //     if (resposta === 'neutro') return 0;
  //     return -1;
  //   });
  //   const scoreTotal = pontuacoes.reduce((a, b) => a + b, 0 as number);
  //   return scoreTotal < 0;
  // });

  const topicos = Object.keys(estatisticas);

  return (
    <div className="saude-professor-container">
      <h2>💚 Saúde e Bem-Estar dos Alunos</h2>

      {carregando ? (
        <p>Carregando estatísticas...</p>
      ) : (
        <>
          <div className="graficos-container">
            {topicos.map(topico => (
              <div className="graficoSaude" key={topico}>
                <h4>{topico}</h4>
                <Doughnut data={getDoughnutData(topico)} />
              </div>
            ))}
          </div>

          <div className="alertas-container">
            <h3>🚨 Alunos em Alerta</h3>

            {alunosAlerta.length === 0 ? (
              <p>Todos os alunos estão bem! 🥳</p>
            ) : (
              <table className="tabela-alerta">
                <thead>
                  <tr>
                    <th>Aluno</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Resumo</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosAlerta.map((aluno, index) => (
                    <tr key={index} className={`status-${aluno.status.toLowerCase()}`}>
                      <td>{aluno.aluno}</td>
                      <td>
                        {aluno.status === 'Crítico' && '🔴 Crítico'}
                        {aluno.status === 'Alerta' && '🟠 Alerta'}
                        {aluno.status === 'OK' && '🟢 OK'}
                      </td>
                      <td>{aluno.score}</td>
                      <td>
                        {Object.entries(aluno.respostas).map(([topico, nivel]) => (
                          <div key={topico}>
                            {topico}: {nivel === 'positivo' ? '😊' : nivel === 'neutro' ? '😐' : '😢'}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SaudeBemEstarProfessor;
