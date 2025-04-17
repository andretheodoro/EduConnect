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

interface AlunoAlerta {
  aluno: string;
  respostas: { [topico: string]: string };
  score: number;
  status: 'OK' | 'Alerta' | 'Crítico';
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [dadosNotas, setDadosNotas] = useState<AlunoNota[]>([]);
  const [dadosFrequencia, setDadosFrequencia] = useState<AlunoFrequencia[]>([]);
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [frequenciaIdeal, setFrequenciaIdeal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [alunosAlerta, setAlunosAlerta] = useState<AlunoAlerta[]>([]);
  const [contagemStatus, setContagemStatus] = useState({ ok: 0, alerta: 0, critico: 0 });
  
  useEffect(() => {
    const fetchAlunosAlerta = async () => {
      try {
        const res = await api.get('/bem-estar/respostas-alunos');
        setAlunosAlerta(res.data);
  
        const statusCount = { ok: 0, alerta: 0, critico: 0 };
        res.data.forEach((aluno: AlunoAlerta) => {
          if (aluno.status === 'OK') statusCount.ok += 1;
          if (aluno.status === 'Alerta') statusCount.alerta += 1;
          if (aluno.status === 'Crítico') statusCount.critico += 1;
        });
        setContagemStatus(statusCount);
      } catch (err) {
        console.error('Erro ao buscar status emocional:', err);
      }
    };
  
    fetchAlunosAlerta();
  }, []);
  
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
      const frequencia = dadosFrequencia.filter((a) => a.media_frequencia >= 70).length;
      setTotalAlunos(total);
      setFrequenciaIdeal(frequencia);
      setLoading(false); 
    }
  }, [dadosFrequencia]);

  if (loading) {
    return <div>Carregando...</div>;
  }


  const frequenciaBaixa = totalAlunos - frequenciaIdeal;


  const mediaGeral =
    dadosNotas.length > 0
      ? (
          dadosNotas.reduce((acc, a) => acc + parseFloat(a.media_nota), 0) / dadosNotas.length
        ).toFixed(1)
      : '0.0';
  const mediaColor = parseFloat(mediaGeral) < 7 ? '#ef4444' : '#10b981';

  const coresNotas = dadosNotas.map((aluno) => {
    const nota = aluno.media_nota;
    if (parseFloat(nota) > 8) return 'rgba(16, 185, 129, 0.7)'; 
    if (parseFloat(nota) >= 7) return 'rgba(249, 115, 22, 0.7)'; 
    return 'rgba(239, 68, 68, 0.7)';                               
  });

  const chartData = {
    labels: dadosNotas.map((a) => a.name.split(' ')[0]),
    datasets: [
      {
        label: 'Nota',
        data: dadosNotas.map((a) => parseFloat(a.media_nota)), 
        backgroundColor: coresNotas,
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

      if (totalAlunos === 0 || frequenciaIdeal === 0) {
        ctx.restore();
        return; 
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

  const chartSaudeEmocionalData = {
    labels: ['OK', 'Alerta', 'Crítico'],
    datasets: [
      {
        data: [
          contagemStatus.ok,
          contagemStatus.alerta,
          contagemStatus.critico
        ],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 1
      }
    ]
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
    {/* Estado Emocional */}
<div className="card-home" onClick={() => navigate('/saude-bemestar')}>
  <div className="card-header">
    <h3>Estado Emocional</h3>
  </div>
  <div className="mini-chart">
    <Doughnut
      data={chartSaudeEmocionalData}
      options={{
        plugins: { legend: { display: true, position: 'right' } },
        cutout: '70%'
      }}
    />
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
