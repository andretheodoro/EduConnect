import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/biblioteca.css';

interface Material {
  titulo: string;
  arquivoPath: string;
  capaPath: string;
  dataUpload: string;
}

const BibliotecaDigital: React.FC = () => {
  const [materiais, setMateriais] = useState<Material[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await api.get('/materiais');
            setMateriais(res.data);
          } 
        catch (err) {
            console.error('Erro ao buscar materiais:', err);
        }
    };

    fetchData();
  }, []);

  return (
    <div className="biblioteca-container">
      <h2>📚 Biblioteca Digital</h2>
      <div className="tabela-materiais">
        {materiais.map((material, index) => (
          <div className="card-material" key={`${material.arquivoPath}-${index}`}>
            <div className="capa">
                <img src={material.capaPath} alt="Capa do material" />
            </div>
            <div className="info">
              <p><strong>Título:</strong> {material.titulo}</p>
              <p><strong>Data:</strong> {new Date(material.dataUpload).toLocaleDateString()}</p>
              <a href={material.arquivoPath} target="_blank" rel="noopener noreferrer" download className="btn-download">📥 Visualizar</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibliotecaDigital;
