import { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nome: string;
  tipo: 'P' | 'A' | 'R'; 
}

export function useUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('usuario');
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  return usuario;
}
