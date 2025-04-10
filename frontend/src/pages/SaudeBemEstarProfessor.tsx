import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/saudeBemEstarProfessor.css';
import { dadosSimulados, alunosEmAlerta } from '../mocks/mockBemEstar';

const SaudeBemEstarProfessor: React.FC = () => {
  const labels = ['😊 Positivo', '😐 Neutro', '😢 Negativo'];

  const getDoughnutData = (tema: keyof typeof dadosSimulados) => ({
    labels,
    datasets: [
      {
        data: dadosSimulados[tema],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="saude-professor-container">
      <h2>💚 Saúde e Bem-Estar dos Alunos</h2>

      <div className="graficos-container">
        <div className="graficoSaude">
          <h4>Felicidade</h4>
          <Doughnut data={getDoughnutData('felicidade')} />
        </div>
        <div className="graficoSaude">
          <h4>Amigos</h4>
          <Doughnut data={getDoughnutData('amigos')} />
        </div>
        <div className="graficoSaude">
          <h4>Família</h4>
          <Doughnut data={getDoughnutData('familia')} />
        </div>
        <div className="graficoSaude">
          <h4>Escola</h4>
          <Doughnut data={getDoughnutData('escola')} />
        </div>
        <div className="graficoSaude">
          <h4>Ansiedade</h4>
          <Doughnut data={getDoughnutData('ansiedade')} />
        </div>
        <div className="graficoSaude">
          <h4>Autoestima</h4>
          <Doughnut data={getDoughnutData('autoestima')} />
        </div>
      </div>

      <div className="alertas-container">
        <h3>🚨 Alunos em Alerta</h3>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {alunosEmAlerta.map((aluno, index) => (
              <tr key={index}>
                <td>{aluno.nome}</td>
                <td>{aluno.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaudeBemEstarProfessor;
