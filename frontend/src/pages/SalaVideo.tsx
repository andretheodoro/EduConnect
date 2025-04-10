import React, { useState } from "react";
import "../styles/SalaVideo.css";
import { FaArrowLeft } from "react-icons/fa";

const VideoSala: React.FC = () => {
  const [salaNome, setSalaNome] = useState("");
  const [entrou, setEntrou] = useState(false);

  const linkBase = "https://educonnectfiap.daily.co/";

  return (
    <div className="video-container">
      {!entrou ? (
        <div className="formulario fade-in">
          <h2>🎥 Entrar na Videoconferência</h2>
          <p>Informe o nome da sala para iniciar a chamada com sua turma.</p>
          <input
            type="text"
            placeholder="Ex: sala-professores"
            value={salaNome}
            onChange={(e) => setSalaNome(e.target.value)}
          />
          <button disabled={!salaNome} onClick={() => setEntrou(true)}>
            Entrar na Sala
          </button>
        </div>
      ) : (
        <div className="iframe-container fade-in">
          <div className="iframe-header">
          <button className="voltar-btn" onClick={() => setEntrou(false)}>
              <FaArrowLeft style={{ marginRight: "8px" }} />
              Voltar
            </button>
            <h3>{`Sala: ${salaNome}`}</h3>
          </div>
          <iframe
            allow="camera; microphone; fullscreen; display-capture"
            src={`${linkBase}${salaNome}`}
            title="Sala de Videoconferência"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoSala;
