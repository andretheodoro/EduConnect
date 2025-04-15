// HomeAluno.tsx
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../services/api';
import { useUsuario } from '../hooks/useUsuario';
import '../styles/homeAluno.css';
// import '../styles/notasFrequenciasCard.css';
// import '../styles/saudeBemEstarAlunoCard.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AlunoNota {
  subject: string;
  grade: number;
}

interface Resposta {
  [topico: string]: number;
}

const EMOTICONS: Record<number, string> = {
  1: '😢',
  2: '🙁',
  3: '😐',
  4: '🙂',
  5: '😄'
};

interface AlunoFrequencia {
  subject: string;
  frequencia: number;
}

const HomeAluno: React.FC = () => {
  const navigate = useNavigate();
  const usuario = useUsuario();
  const alunoId = usuario?.idPerfilUsuario || 0;
  const usuarioId = usuario?.id || 0;

  const [dadosNotas, setDadosNotas] = useState<AlunoNota[]>([]);
  const [dadosFrequencia, setDadosFrequencia] = useState<AlunoFrequencia[]>([]);
  const [ultimasRespostas, setUltimasRespostas] = useState<Resposta | null>(null);

  // Buscar Notas
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await api.get(`/notas/aluno/${alunoId}`);
        setDadosNotas(response.data);
      } catch (error) {
        console.error('Erro ao buscar notas do aluno:', error);
      }
    };

       const fetchFrequencias = async () => {
          try {
            const response = await api.get(`/frequencias/aluno/${alunoId}`);
            setDadosFrequencia(response.data);
          } catch (error) {
            console.error('Erro ao buscar frequências do aluno:', error);
          }
        };

    if (alunoId > 0) fetchNotas(); fetchFrequencias();
  }, [alunoId]);

  // Buscar Respostas de Bem-Estar
  useEffect(() => {
    const fetchRespostas = async () => {
      try {
        const response = await api.get(`/bem-estar/respostas/${usuarioId}`);
        setUltimasRespostas(response.data);
      } catch (error) {
        console.error('Erro ao buscar as respostas de bem-estar', error);
      }
    };

    console.log('usuarioId', usuarioId);
    if (usuarioId != 0) fetchRespostas();
  }, [usuarioId]);

  // Cálculo da média
  const mediaNotaAluno = dadosNotas.length
    ? dadosNotas.reduce((acc, curr) => acc + Number(curr.grade), 0) / dadosNotas.length
    : 0;

  const coresNotas = dadosNotas.map((nota) => {
    const grade = nota.grade;
    if (grade >= mediaNotaAluno) return 'rgba(16, 185, 129, 0.7)';
    if (grade >= mediaNotaAluno - 1) return 'rgba(249, 115, 22, 0.7)';
    return 'rgba(239, 68, 68, 0.7)';
  });

  const chartNotasData = {
    labels: dadosNotas.map((nota) => nota.subject),
    datasets: [
      {
        label: 'Notas',
        data: dadosNotas.map((nota) => Number(nota.grade)),
        backgroundColor: coresNotas,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Notas' },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 30 },
      },
      y: { beginAtZero: true },
    },
  };

  const chartOptionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 30 },
      },
      y: { beginAtZero: true },
    },
  };

  const chartFrequenciaData = {
    labels: dadosFrequencia.map((freq) => freq.subject),
    datasets: [
      {
        label: 'Frequência (%)',
        data: dadosFrequencia.map((freq) => freq.frequencia),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-container">
      <div className="cards-container">
        {/* Card de Notas */}
        <div className="card-home" onClick={() => navigate('/notas-frequencia-aluno')}>
          <div className="card-header">
            <h3>Notas</h3>
          </div>
          <div className="mini-chart-with-info">
            <div className="mini-chart">
              <Bar data={chartNotasData} options={chartOptionsBar} />
            </div>
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
        </div>
     {/* Card de Frequencias */}
     <div className="card-home" onClick={() => navigate('/notas-frequencia-aluno')}>
          <div className="card-header">
            <h3>Frequências</h3>
          </div>
          <div className="mini-chart-with-info">
            <div className="mini-chart">
              <Line data={chartFrequenciaData} options={chartOptionsLine} />
            </div>
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
        </div>    
      </div>
      <div className="cards-container">
       {/* Card de Saúde e Bem-Estar */}
       <div  className="card-home" onClick={() => navigate('/saude-bemestar-aluno')}>
          <div className="card-header">
            <h3>Últimos Sentimentos</h3>
          </div>
          <div className="mini-chart-with-info">
            <div className="mini-chart">
              {ultimasRespostas ? (
                <>
                  {Object.entries(ultimasRespostas)
                    .reduce((acc: [string, number][][], curr, index) => {
                      const groupIndex = Math.floor(index / 4);
                      if (!acc[groupIndex]) acc[groupIndex] = [];
                      acc[groupIndex].push(curr);
                      return acc;
                    }, [])
                    .map((grupo, idx) => (
                      <div key={idx} className="respostas-grid">
                        {grupo.map(([topico, valor]) => (
                          <div key={topico} className="resposta-item">
                            <div className="emoji">{EMOTICONS[valor]}</div>
                            <span className="topico">{topico}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              ) : (
                <p>Carregando respostas...</p>
              )}
            </div>
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
          </div>
        </div>
    </div>
  );
};

export default HomeAluno;
