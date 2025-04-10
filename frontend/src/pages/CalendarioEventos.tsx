import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendario.css';
import { mockEventos } from '../mocks/mockEventos';

interface Evento {
  data: Date;
  horario: string;
  descricao: string;
}

const eventos = mockEventos;

const CalendarioEventos: React.FC = () => {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDataSelecionada(value);
    }
  };

  const eventosDoDia = eventos.filter(evento =>
    evento.data.toDateString() === dataSelecionada.toDateString()
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
            const hasEvent = eventos.some(e => e.data.toDateString() === date.toDateString());
          
            if (isToday && hasEvent) return 'highlight today'; // ambos
            if (isToday) return 'today';
            if (hasEvent) return 'highlight';
            return null;
          }}
        />
        <div className="eventos-dia">
          <h3>Eventos em {dataSelecionada.toLocaleDateString()}</h3>
          {eventosDoDia.length > 0 ? (
            eventosDoDia.map((evento, idx) => (
              <div key={idx} className="evento">
                <strong>{evento.horario}</strong> - {evento.descricao}
              </div>
            ))
          ) : (
            <p>Sem eventos para esta data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarioEventos;
