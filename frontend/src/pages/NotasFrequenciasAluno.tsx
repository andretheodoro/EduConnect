import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import '../styles/notasFrequencias.css';
import AlertasRendimento from './AlertasRendimento';
import api from '../services/api';
import { useUsuario } from '../hooks/useUsuario';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

interface AlunoNota {
  subject: string;
  grade: number;
}

interface AlunoFrequencia {
  subject: string;
  frequencia: number;
}

const NotasFrequenciasAluno: React.FC = () => {
  const usuario = useUsuario();
  const alunoId = usuario?.idPerfilUsuario || 0;

  const [dadosNotas, setDadosNotas] = useState<AlunoNota[]>([]);
  const [dadosFrequencia, setDadosFrequencia] = useState<AlunoFrequencia[]>([]);
  const [aluno, setAluno] = useState<AlunoNota | null>(null);

  useEffect(() => {
    if (!(alunoId > 0)) {
        return; 
    }
    
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

    fetchNotas();
    fetchFrequencias();
  }, [alunoId]);

  const mediaNotaAluno = dadosNotas.length
    ? dadosNotas.reduce((acc, curr) => acc + Number(curr.grade), 0) / dadosNotas.length
    : 0;

  const mediaFreqAluno = dadosFrequencia.reduce(
    (acc, curr) => acc + Number(curr.frequencia),
    0
  ) / (dadosFrequencia.length || 1);

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

  const chartDoughnutData = {
    labels: ['Acima da Média', 'Abaixo da Média'],
    datasets: [
      {
        data: [dadosNotas.filter((nota) => nota.grade >= 7).length, dadosNotas.length - dadosNotas.filter((nota) => nota.grade >= 7).length],
        backgroundColor: ['#10b981', '#ef4444'],
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

  return (
    <div className="notas-frequencias-container">
      <div className="notas-frequencias-header">
        <h2>Notas e Frequências do Aluno</h2>
      </div>

      <div className="cards-resumo">
        <div className="card">
          <strong>Nota Média do Aluno:</strong> {mediaNotaAluno.toFixed(1)}
        </div>
        <div className="card">
          <strong>Frequência Média do Aluno (%):</strong> {mediaFreqAluno.toFixed(1)}
        </div>
      </div>

      <div className="gráficos">
        <div className="grafico">
          <h3>Notas</h3>
          <div className="grafico-scroll-wrapper">
            <div className="grafico-grande">
              <Bar data={chartNotasData} options={chartOptionsBar} />
            </div>
          </div>
        </div>

        <div className="grafico">
          <h3>Frequência</h3>
          <div className="grafico-scroll-wrapper">
            <div className="grafico-grande">
              <Line data={chartFrequenciaData} options={chartOptionsLine} />
            </div>
          </div>
        </div>

        <div className="grafico">
          <h3>Doughnut - Notas vs Média do Aluno</h3>
          <div className="grafico-scroll-wrapper">
            <div className="grafico-grande">
              <Doughnut data={chartDoughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotasFrequenciasAluno;
