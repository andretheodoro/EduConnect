import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ArcElement,
} from 'chart.js';

import '../styles/home.css';
import { FaArrowRight } from 'react-icons/fa';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ArcElement);

interface AlunoNota {
  aluno_id: number;
  name: string;
  media_nota: string;
}

interface AlunoFrequencia {
  aluno_id: number;
  name: string;
  media_frequencia: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [dadosNotas, setDadosNotas] = useState<AlunoNota[]>([]);
  const [dadosFrequencia, setDadosFrequencia] = useState<AlunoFrequencia[]>([]);
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [frequenciaIdeal, setFrequenciaIdeal] = useState(0);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const res = await api.get('/notas/media');
        setDadosNotas(res.data.slice(0, 10)); // Mostra os 10 primeiros
      } catch (err) {
        console.error('Erro ao buscar notas:', err);
      }
    };

    const fetchFrequencia = async () => {
      try {
        const res = await api.get('/frequencias/media');
        setDadosFrequencia(res.data);
      } catch (err) {
        console.error('Erro ao buscar frequência:', err);
      }
    };

    fetchNotas();
    fetchFrequencia();
  }, []);

  useEffect(() => {
    if (dadosFrequencia.length > 0) {
      const total = dadosFrequencia.length;
      const frequencia = dadosFrequencia.filter((a) => a.media_frequencia >= 75).length;
      setTotalAlunos(total);
      setFrequenciaIdeal(frequencia);
      setLoading(false); // Dados carregados, desabilitar o loading
    }
  }, [dadosFrequencia]);

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem ou um loader enquanto os dados são carregados
  }


  const frequenciaBaixa = totalAlunos - frequenciaIdeal;


  const mediaGeral =
    dadosNotas.length > 0
      ? (
          dadosNotas.reduce((acc, a) => acc + parseFloat(a.media_nota), 0) / dadosNotas.length
        ).toFixed(1)
      : '0.0';
  const mediaColor = parseFloat(mediaGeral) < 6 ? '#ef4444' : '#10b981';

  const chartData = {
    labels: dadosNotas.map((a) => a.name.split(' ')[0]),
    datasets: [
      {
        label: 'Nota',
        data: dadosNotas.map((a) => parseFloat(a.media_nota)), // Certifique-se de que media_nota é convertida para número
        backgroundColor: dadosNotas.map((a) =>
          parseFloat(a.media_nota) >= 6 ? '#10b981' : '#ef4444'
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

  const doughnutCenterTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      // Certifique-se de que os dados estão carregados antes de desenhar
      if (totalAlunos === 0 || frequenciaIdeal === 0) {
        ctx.restore();
        return; // Não desenha nada até que os dados estejam disponíveis
      }

      const percentText = totalAlunos > 0
        ? ((frequenciaIdeal / totalAlunos) * 100).toFixed(0) + '%'
        : '0%';

      ctx.font = 'bold 16px sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#333';
      ctx.fillText(percentText, width / 2, height / 2 - 10);

      ctx.font = 'normal 14px sans-serif';
      ctx.fillStyle = '#555';
      ctx.fillText('frequência boa', width / 2, height / 2 + 10);

      ctx.save();
    },
  };

  const chartFrequenciaData = {
    labels: ['Boa Frequência', 'Baixa Frequência'],
    datasets: [
      {
        data: [frequenciaIdeal, frequenciaBaixa],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: { display: false },
      centerText: true,
    },
    cutout: '70%',
  };

  return (
    <div className="home-container">
      <div className="cards-container">
        {/* Notas */}
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
              <span className="media-value" style={{ color: mediaColor }}>
                {mediaGeral}
              </span>
            </div>
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
        </div>

        {/* Frequência */}
        <div className="card-home" onClick={() => navigate('/notas-frequencias')}>
          <div className="card-header">
            <h3>Frequência</h3>
          </div>
          <div className="mini-chart">
            <Doughnut
              data={chartFrequenciaData}
              options={doughnutOptions}
              plugins={[doughnutCenterTextPlugin]}
            />
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
        </div>
      </div>
      <div className="cards-container">
        {/* Emocao */}
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
              <span className="media-value" style={{ color: mediaColor }}>
                {mediaGeral}
              </span>
            </div>
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
        </div>

        {/* Frequência */}
        <div className="card-home" onClick={() => navigate('/notas-frequencias')}>
          <div className="card-header">
            <h3>Frequência</h3>
          </div>
          <div className="mini-chart">
            <Doughnut
              data={chartFrequenciaData}
              options={doughnutOptions}
              plugins={[doughnutCenterTextPlugin]}
            />
          </div>
          <div className="card-footer">
            <FaArrowRight className="ver-mais-icon" title="Ver mais" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
