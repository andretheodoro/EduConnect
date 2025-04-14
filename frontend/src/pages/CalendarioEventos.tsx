import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendario.css';
import '../styles/modalCalendario.css';
import api from '../services/api';
import { useUsuario } from '../hooks/useUsuario';

interface Evento {
  id: string;
  date: Date;
  time: string;
  description: string;
  turma_id?: number;
}

interface Turma {
  id: number;
  name: string;
}

const CalendarioEventos: React.FC = () => {
  const usuario = useUsuario();
  const usuarioId = usuario?.id || 0;

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState({ time: '', description: '', turmaId: '' });

  const buscarEventos = async () => {
    try {
      const response = await api.get(`/eventos/${usuarioId}`);
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const buscarTurmas = async () => {
    try {
      const response = await api.get(`/turmas`);
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      buscarEventos();
      buscarTurmas();
    }
  }, [usuario]);

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDataSelecionada(value);
    }
  };

  const handleCadastrarEvento = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/eventos', {
        date: dataSelecionada,
        time: novoEvento.time,
        description: novoEvento.description,
        turmaId: novoEvento.turmaId ? Number(novoEvento.turmaId) : null,
        usuarioId: usuarioId,
      });

      setNovoEvento({ time: '', description: '', turmaId: '' });
      setMostrarModal(false);
      buscarEventos();
    } catch (error) {
      console.error('Erro ao cadastrar evento:', error);
    }
  };

  const eventosDoDia = eventos.filter(
    evento =>
      new Date(evento.date).toDateString() ===
      dataSelecionada.toDateString()
  );

  return (
    <div className="calendario-container">
      <h2>Calendário Escolar</h2>
      <div className="calendario-wrapper">
        <Calendar
          onChange={handleDateChange as any}
          value={dataSelecionada}
          tileClassName={({ date }) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const hasEvent = eventos.some(
              e => new Date(e.date).toDateString() === date.toDateString()
            );

            if (isToday && hasEvent) return 'highlight today';
            if (isToday) return 'today';
            if (hasEvent) return 'highlight';
            return null;
          }}
        />

        <div className="eventos-dia">
          <div className="eventos-header">
            <h3>Eventos em {dataSelecionada.toLocaleDateString()}</h3>
            <button className="botao-mais" onClick={() => setMostrarModal(true)}>+</button>
          </div>

          {eventosDoDia.length > 0 ? (
            eventosDoDia.map((evento, idx) => (
              <div key={idx} className="evento">
              <strong>{evento.time.slice(0, 5)}</strong> - {evento.description}
              {evento.turma_id && (   
                  <span style={{ fontSize: '0.8rem', color: '#666' }}> (Turma)</span>
                )}
              </div>
            ))
          ) : (
            <p>Sem eventos para esta data.</p>
          )}
        </div>
      </div>

      {/* Modal de novo evento */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Novo Evento</h3>
            <form onSubmit={handleCadastrarEvento}>
              <label>
                Hora:
                <input
                  type="time"
                  value={novoEvento.time}
                  onChange={e => setNovoEvento({ ...novoEvento, time: e.target.value })}
                  required
                />
              </label>

              <label>
                Descrição:
                <input
                  type="text"
                  value={novoEvento.description}
                  onChange={e => setNovoEvento({ ...novoEvento, description: e.target.value })}
                  required
                />
              </label>

              <label>
                Turma:
                <select
                  value={novoEvento.turmaId}
                  onChange={e => setNovoEvento({ ...novoEvento, turmaId: e.target.value })}
                >
                  <option value="">Selecione uma turma</option>
                  {turmas.map(turma => (
                    <option key={turma.id} value={turma.id}>
                      {turma.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="botoes-modal">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioEventos;
