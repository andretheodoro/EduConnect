import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Line  } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ArcElement,
  Tooltip as ChartTooltip,
} from 'chart.js';

import '../styles/home.css';
import { mockAlunos } from '../mocks/mockAlunos';
import { FaArrowRight } from 'react-icons/fa'; // ou qualquer outro ícone

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS.register(ArcElement, ChartTooltip);

const Home: React.FC = () => {
  const navigate = useNavigate();

  const alunosExibidos = mockAlunos.slice(0, 10); // Mini gráfico com 5 alunos

  const chartData = {
    labels: alunosExibidos.map((aluno) => aluno.nome.split(' ')[0]), // só o primeiro nome
    datasets: [
      {
        label: 'Nota',
        data: alunosExibidos.map((aluno) => aluno.nota),
        backgroundColor: alunosExibidos.map((aluno) =>
          aluno.nota >= 6 ? '#10b981' : '#ef4444'
        ),
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false, min: 0, max: 10 },
    },
  };

  const totalAlunos = mockAlunos.length;
  const frequenciaIdeal = mockAlunos.filter((a) => a.frequencia >= 75).length;
  const frequenciaBaixa = totalAlunos - frequenciaIdeal;

  const doughnutCenterTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.restore();
  
      const percentText = ((frequenciaIdeal / totalAlunos) * 100).toFixed(0) + '%';
      const labelText = 'frequência boa';
  
      // Primeira linha (percentual)
      ctx.font = 'bold 16px sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#333';
      ctx.fillText(percentText, width / 2, height / 2 - 10);
  
      // Segunda linha (legenda)
      ctx.font = 'normal 14px sans-serif';
      ctx.fillStyle = '#555';
      ctx.fillText(labelText, width / 2, height / 2 + 10);
  
      ctx.save();
    }
  };
  

  const chartFrequenciaData = {
    labels: ['Boa Frequência', 'Baixa Frequência'],
    datasets: [
      {
        data: [frequenciaIdeal, frequenciaBaixa],
        backgroundColor: ['#10b981', 'red'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: { display: false },
      centerText: true, 
    },
    cutout: '70%', // deixa o gráfico mais “clean”
  };

  const mediaGeral = (
    mockAlunos.reduce((acc, aluno) => acc + aluno.nota, 0) / mockAlunos.length
  ).toFixed(1);
  const mediaColor = parseFloat(mediaGeral) < 6 ? '#ef4444' : '#10b981';

  return (
    <div className="home-container">
      <div className="cards-container">
      <div className="card-home" onClick={() => navigate('/notas-frequencias')}>
        <div className="card-header">
          <h3>Notas Recentes</h3>
        </div>
        <div className="mini-chart-with-info">
          <div className="mini-chart">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="media-info">
            <span className="media-label">Média Geral:</span>
            <span className="media-value"style={{ color: mediaColor }}>
              {mediaGeral}
            </span>
          </div>
        </div>
        <div className="card-footer">
          <FaArrowRight className="ver-mais-icon" title="Ver mais" />
        </div>
      </div>
        <div className="card-home" onClick={() => navigate('/notas-frequencias')}>
        <div className="card-header">
          <h3>Frequência</h3>
        </div>
        <div className="mini-chart" >
          <Doughnut data={chartFrequenciaData} options={doughnutOptions} plugins={[doughnutCenterTextPlugin]}          />
        </div>
        <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
        </div>
      </div>

        {/* Próximos cards virão aqui */}
      </div>
    </div>
  );
};

export default Home;
