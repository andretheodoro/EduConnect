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
  aluno_id: number;
  email: string;
  name: string;
  media_nota: number;
}

interface AlunoFrequencia {
  aluno_id: number;
  email: string;
  name: string;
  media_frequencia: number;
}

const NotasFrequencias: React.FC = () => {
  const [dadosNotas, setDadosNotas] = useState<AlunoNota[]>([]);
  const [dadosFrequencia, setDadosFrequencia] = useState<AlunoFrequencia[]>([]);
  const [turmas, setTurmas] = useState<any[]>([]);
  const [disciplinas, setDisciplinas] = useState<string[]>([]);
  const [filtroTurma, setFiltroTurma] = useState<string>('');
  const [filtroDisciplina, setFiltroDisciplina] = useState<string>('');

  const params = {
    classId: filtroTurma || undefined,
    subject: filtroDisciplina || undefined
  };

  useEffect(() => {
    const fetchMedicaNotas = async () => {
      try {
        const response = await api.get('/notas/media', { params });
        console.log("media:", response.data);
        setDadosNotas(response.data);
      } catch (error) {
        console.error('Erro ao buscar média de notas:', error);
      }
    };

    const fetchMedicaFreq = async () => {
      try {
        const response = await api.get('/frequencias/media', { params });
        console.log("frequencias:", response.data);
        setDadosFrequencia(response.data);
      } catch (error) {
        console.error('Erro ao buscar média de frequencias:', error);
      }
    };

    const fetchTurmas = async () => {
      try {
        const response = await api.get('/alunos/turmas');
        console.log(response)
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    const fetchDisciplinas = async () => {
      try {
        const response = await api.get('/notas/disciplinas');
        const disciplinasFormatadas = response.data.map((item: any) => item.subject);
        setDisciplinas(disciplinasFormatadas);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchTurmas();
    fetchDisciplinas();
    fetchMedicaNotas();
    fetchMedicaFreq();
  }, []);

  const totalAlunos = dadosNotas.length;

  const mediaTurma = dadosNotas.length
    ? dadosNotas.reduce((acc, curr) => acc + Number(curr.media_nota), 0) / dadosNotas.length
    : 0;

  const mediaFreqTurma = dadosFrequencia.reduce((acc, curr) => acc + Number(curr.media_frequencia), 0) / (dadosFrequencia.length || 1);

  const acimaDaMedia = dadosNotas.filter((a) => Number(a.media_nota) >= mediaTurma).length;
  const abaixoDaMedia = dadosNotas.length - acimaDaMedia;

  const coresNotas = dadosNotas.map((aluno) => {
    const nota = aluno.media_nota;
    if (nota >= mediaTurma) return 'rgba(16, 185, 129, 0.7)';
    if (nota >= mediaTurma - 1) return 'rgba(249, 115, 22, 0.7)';
    return 'rgba(239, 68, 68, 0.7)';
  });

  const chartNotasData = {
    labels: dadosNotas.map((a) => a.name),
    datasets: [
      {
        label: 'Notas',
        data: dadosNotas.map((a) => Number(a.media_nota)),
        backgroundColor: coresNotas,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };

  const chartFrequenciaData = {
    labels: dadosFrequencia.map((a) => a.name),
    datasets: [
      {
        label: 'Frequência (%)',
        data: dadosFrequencia.map((a) => a.media_frequencia),
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

  const handleAplicarFiltros = async () => {
    try {
      const params = {
        classId: filtroTurma || undefined,
        subject: filtroDisciplina || undefined
      };

      const [notasRes, freqRes] = await Promise.all([
        api.get('/notas/media', { params }),
        api.get('/frequencias/media', { params }),
      ]);

      setDadosNotas(notasRes.data);
      setDadosFrequencia(freqRes.data);
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    }
  };

  return (
    <div className="notas-frequencias-container">
      <div className="notas-frequencias-header">
        <h2>Análise de Notas e Frequências</h2>
        <div className="filtros">
          <select value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)}>
            <option value="">Todas as Turmas</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.name}
              </option>
            ))}
          </select>

          <select value={filtroDisciplina} onChange={(e) => setFiltroDisciplina(e.target.value)}>
            <option value="">Todas as Disciplinas</option>
            {disciplinas.map((disciplina, idx) => (
              <option key={idx} value={disciplina}>
                {disciplina}
              </option>
            ))}
          </select>

          <button onClick={handleAplicarFiltros}>Aplicar Filtros</button>
        </div>
      </div>

      <div className="cards-resumo">
        <div className="card"><strong>Total de Alunos:</strong> {totalAlunos}</div>
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

        <AlertasRendimento alunos={dadosNotas.map((aluno) => ({
          id: aluno.aluno_id,
          email: aluno.email,
          nome: aluno.name,
          nota: Number(aluno.media_nota),
          frequencia: dadosFrequencia.find((f) => f.aluno_id === aluno.aluno_id)?.media_frequencia || 0
        }))} />
      </div>
    </div>
  );
};

export default NotasFrequencias;
