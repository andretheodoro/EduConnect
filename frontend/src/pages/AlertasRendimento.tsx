import React, { useState } from "react";
import "../styles/AlertasRendimento.css";
import Notification from '../components/Notification';
import { useNotification } from '../hooks/useNotification';
import api from "../services/api";
import IMessage from "../models/IMessage";
import { sendMessage } from "../services/message";
import socket from "../services/socket";
import { Box, Button } from "@mui/material";
import { FiSend } from "react-icons/fi";

interface AlunoData {
  id: number;
  email: string;
  nome: string;
  nota: number;
  frequencia: number;
}

interface Props {
  alunos: AlunoData[];
}

const AlertasRendimento: React.FC<Props> = ({ alunos }) => {
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const {
    message,
    type,
    visible,
    showNotification,
    closeNotification
  } = useNotification();

  const toggleSelecionado = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((alunoId) => alunoId !== id) : [...prev, id]
    );
  };

  const estaSelecionado = (id: number) => selecionados.includes(id);

  const enviarAlertas = async () => {


    // get api alunos and use the email, to send a new message of alert
    const alunosSelecionados = alunos.filter((a) => selecionados.includes(a.id));

    if (alunosSelecionados.length === 0) {
      showNotification('Nenhum aluno selecionado.', 'info');
      return;
    }
    console.log("alunosSelecionados", alunosSelecionados);
    try {

      const userEmail = JSON.parse(localStorage.getItem('usuario') || '{}').email;

      const mensagens = alunosSelecionados.map((aluno: any) => ({
        title: "Alerta Acadêmico",
        content: `Alerta: ${getAlerta(aluno.nota, aluno.frequencia)}`,
        senderId: userEmail,
        recipientIds: [aluno.email],
        createdAt: new Date().toISOString(),
        readBy: [],
        isRead: false,
      }));

      console.log("mensagens", mensagens);

      // Send messages
      let successCount = 0;
      let failCount = 0;
      await Promise.all(
        mensagens.map(async (mensagem: IMessage) => {
          try {
            const response = await sendMessage(mensagem);
            console.log('Resposta do envio:', response);

            if (response.status >= 200 && response.status < 300) {
              successCount++;
              socket.emit('sendMessage', mensagem);
            } else {
              failCount++;
            }
          } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            failCount++;
          }
        })
      );

      const nomes = alunosSelecionados.map((a) => a.nome).join(", ");

      // Mensagem consolidada
      showNotification(
        `Alertas enviados.\nSucesso: ${successCount} | Falha: ${failCount}`,
        failCount > 0 ? 'warning' : 'success',
        6000
      );
      setSelecionados([]);

    } catch (error) {
      console.error("Erro ao enviar alertas:", error);
      showNotification('Erro ao enviar alertas.', 'error');
    }
  };

  const getAlerta = (nota: number, frequencia: number) => {
    if (nota < 7 && frequencia < 70) return "Nota e frequência abaixo do ideal";
    if (nota < 7) return "Nota abaixo do ideal";
    if (frequencia < 70) return "Frequência abaixo do ideal";
    return "Desempenho adequado";
  };

  const getClassName = (nota: number, frequencia: number) => {
    if (nota < 7 && frequencia < 70) return "alerta-vermelho";
    if (nota < 7 || frequencia < 70) return "alerta-laranja";
    return "alerta-verde";
  };

  // Paginação
  const totalPaginas = Math.ceil(alunos.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const alunosPaginados = alunos.slice(indiceInicial, indiceInicial + itensPorPagina);

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <div className="alertas-container">
      <h2>Alertas Acadêmicos</h2>
      <div style={{ marginBottom: '1rem' }}>
        {/* <button className="enviar-button" onClick={enviarAlertas}>
          Enviar Alerta aos Responsáveis
        </button> */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            className="enviar-button"
            onClick={enviarAlertas}
            sx={{ textTransform: 'none' }}
          >
            <FiSend style={{ marginRight: 8, marginTop: 2 }} />
            Enviar Alerta aos Responsáveis
          </Button>
        </Box>
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
          {alunosPaginados.map((aluno) => {
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

      {/* Controles de paginação */}
      <div className="paginacao">
        {/* <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
          ⬅️ Anterior
        </button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={irParaPaginaAnterior}
          sx={{ textTransform: 'none' }}
          disabled={paginaAtual === 1}
        >
          ⬅️ Anterior
        </Button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        {/* <button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas}>
          Próxima ➡️
        </button> */}

        <Button
          variant="contained"
          color="primary"
          onClick={irParaProximaPagina}
          sx={{ textTransform: 'none' }}
          disabled={paginaAtual === totalPaginas}
        >
          Próxima ➡️
        </Button>
      </div>

      {visible && (
        <Notification message={message} type={type} onClose={closeNotification} />
      )}
    </div>
  );
};

export default AlertasRendimento;
