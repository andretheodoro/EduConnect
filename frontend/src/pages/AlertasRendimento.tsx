import React, { useState } from "react";
import "../styles/AlertasRendimento.css"; 

interface AlunoData {
  id: number;
  nome: string;
  nota: number;
  frequencia: number;
}

interface Props {
  alunos: AlunoData[];
}


const AlertasRendimento: React.FC<Props> = ({ alunos }) => {
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const toggleSelecionado = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((alunoId) => alunoId !== id) : [...prev, id]
    );
  };
  
  const estaSelecionado = (id: number) => selecionados.includes(id);

  const enviarAlertas = () => {
    const alunosSelecionados = alunos.filter((a) => selecionados.includes(a.id));
    
    // Simulação de envio (pode trocar por chamada de API depois)
    if (alunosSelecionados.length === 0) {
      alert("Nenhum aluno selecionado.");
      return;
    }
  
    const nomes = alunosSelecionados.map((a) => a.nome).join(", ");
    alert(`Alerta enviado aos responsáveis de: ${nomes}`);
    
    // Limpa seleção após envio
    setSelecionados([]);
  };

  const getAlerta = (nota: number, frequencia: number) => {
    if (nota < 6 && frequencia < 75) return "Nota e frequência abaixo do ideal";
    if (nota < 6) return "Nota abaixo do ideal";
    if (frequencia < 75) return "Frequência abaixo do ideal";
    return "Desempenho adequado";
  };

  const getClassName = (nota: number, frequencia: number) => {
    if (nota < 6 && frequencia < 75) return "alerta-vermelho";
    if (nota < 6 || frequencia < 75) return "alerta-laranja";
    return "alerta-verde";
  };

  return (
    <div className="alertas-container">
      <h2>Alertas Acadêmicos</h2>
      <div style={{ marginBottom: '1rem' }}>
      <button className="enviar-button" onClick={enviarAlertas}>
        Enviar Alerta aos Responsáveis
      </button>
      </div>
      <table className="tabela-alertas">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Nota</th>
            <th>Frequência (%)</th>
            <th>Alerta</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => {
            const alerta = getAlerta(aluno.nota, aluno.frequencia);
            const cor = getClassName(aluno.nota, aluno.frequencia);

            return (
                <tr key={aluno.id} className={cor}>
                <td>
                  <input
                    type="checkbox"
                    checked={estaSelecionado(aluno.id)}
                    onChange={() => toggleSelecionado(aluno.id)}
                  />
                </td>
                <td>{aluno.nome}</td>
                <td>{aluno.nota}</td>
                <td>{aluno.frequencia}</td>
                <td>{alerta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AlertasRendimento;
