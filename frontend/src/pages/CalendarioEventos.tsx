import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendario.css';
import { useEffect } from 'react';
import api from '../services/api'; 

interface Evento {
  date: Date;
  time: string;
  description: string;
}

const CalendarioEventos: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDataSelecionada(value);
    }
  };

  const eventosDoDia = eventos.filter(evento =>
    new Date(evento.date).toDateString() === dataSelecionada.toDateString()
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
            const hasEvent = eventos.some(e => new Date(e.date).toDateString() === date.toDateString());
          
            if (isToday && hasEvent) return 'highlight today';
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
                <strong>{evento.time}</strong> - {evento.description}
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
