interface Evento {
    data: Date;
    horario: string;
    descricao: string;
  }

export const mockEventos: Evento[] = [
    { data: new Date(2025, 3, 10), horario: '10:00', descricao: 'Reunião Pedagógica' },
    { data: new Date(2025, 3, 15), horario: '08:30', descricao: 'Apresentação de Trabalhos' },
    { data: new Date(2025, 3, 22), horario: '14:00', descricao: 'Conselho de Classe' },
  ];
  