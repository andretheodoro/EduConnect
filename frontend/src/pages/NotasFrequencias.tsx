import React from 'react';
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
import { mockAlunos } from '../mocks/mockAlunos';
import AlertasRendimento from './AlertasRendimento';

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


  const NotasFrequencias: React.FC = () => {
  const dadosNotas = mockAlunos.map((a) => ({ nome: a.nome, nota: a.nota }));
  const dadosFrequencia = mockAlunos.map((a) => ({ nome: a.nome, frequencia: a.frequencia }));

  const mediaTurma =
    mockAlunos.reduce((acc, curr) => acc + curr.nota, 0) / mockAlunos.length;

  const mediaFreqTurma =
    mockAlunos.reduce((acc, curr) => acc + curr.frequencia, 0) / mockAlunos.length;

  const acimaDaMedia = dadosNotas.filter((a) => a.nota >= mediaTurma).length;
  const abaixoDaMedia = dadosNotas.length - acimaDaMedia;

  const coresNotas = mockAlunos.map((aluno) =>
    aluno.nota >= mediaTurma ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)' // verde ou vermelho
  );

  const chartNotasData = {
    labels: dadosNotas.map((a) => a.nome),
    datasets: [
      {
        label: 'Notas',
        data: dadosNotas.map((a) => a.nota),
        backgroundColor: coresNotas,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };

  const chartFrequenciaData = {
    labels: dadosFrequencia.map((a) => a.nome),
    datasets: [
      {
        label: 'Frequência (%)',
        data: dadosFrequencia.map((a) => a.frequencia),
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
        data: [acimaDaMedia, abaixoDaMedia],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Notas',
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 30,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartOptionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 30,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="notas-frequencias-container">
      <div className="notas-frequencias-header">
        <h2>Análise de Notas e Frequências</h2>
        <div className="filtros">
          <select><option>Turma 1</option></select>
          <select><option>Matemática</option></select>
          <button>Aplicar Filtros</button>
        </div>
      </div>

      <div className="cards-resumo">
        <div className="card"><strong>Total de Alunos:</strong> {mockAlunos.length}</div>
        <div className="card"><strong>Nota Média da Turma:</strong> {mediaTurma.toFixed(1)}</div>
        <div className="card"><strong>Frequência Média da Turma (%):</strong> {mediaFreqTurma.toFixed(1)}</div>
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
          <h3>Doughnut - Alunos vs Média da Turma</h3>
          <div className="grafico-scroll-wrapper">
            <div className="grafico-grande">
              <Doughnut data={chartDoughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <AlertasRendimento alunos={mockAlunos} />
      </div>
    </div>
  );
};

export default NotasFrequencias;
