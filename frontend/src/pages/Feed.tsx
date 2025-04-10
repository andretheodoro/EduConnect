import React, { useState, useEffect, ChangeEvent } from "react";
import "../styles/Feed.css";

interface Postagem {
  id: number;
  autor: string;
  texto: string;
  imagemUrl: string;
  data: string;
  curtido: boolean;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const dadosFake: Postagem[] = [
      {
        id: 1,
        autor: "Prof. Ana Paula",
        texto: "Hoje realizamos uma linda atividade de ciências com os alunos do 5º ano 🌱✨",
        imagemUrl: "http://localhost:3000/uploads/capas/teste-capa.png",
        data: "2025-04-09T15:45:00Z",
        curtido: false,
      },
      {
        id: 2,
        autor: "Prof. Rafael",
        texto: "Feira cultural foi um sucesso! Parabéns aos alunos 🎉",
        imagemUrl: "http://localhost:3000/uploads/capas/teste-capa.png",
        data: "2025-04-08T18:20:00Z",
        curtido: false,
      },
    ];
    setPosts(dadosFake);
  }, []);

  const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovaImagem(file);
      setPreviewImagem(URL.createObjectURL(file));
    }
  };

  const handlePostar = () => {
    if (!texto || !novaImagem) {
      alert("Preencha o texto e selecione uma imagem.");
      return;
    }

    const novoPost: Postagem = {
      id: posts.length + 1,
      autor: "Você",
      texto,
      imagemUrl: previewImagem!,
      data: new Date().toISOString(),
      curtido: false,
    };

    setPosts([novoPost, ...posts]);
    setNovaImagem(null);
    setPreviewImagem(null);
    setTexto("");
  };

  const toggleCurtir = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, curtido: !p.curtido } : p))
    );
  };

  return (
    <div className="feed-container">
      <h2>📸 <span className="feed-title">Feed Escolar</span></h2>

      <div className="nova-postagem">
        <textarea
          placeholder="Escreva algo sobre sua publicação..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        {previewImagem && (
          <img src={previewImagem} alt="Prévia" className="preview-img" />
        )}

        <div className="botoes-feed">
          <label htmlFor="upload-input" className="upload-btn">📎 Anexar Imagem</label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImagemChange}
          />

          <button className="publicar-btn" onClick={handlePostar}>
            📤 Publicar
          </button>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <strong>{post.autor}</strong>
            <span>{new Date(post.data).toLocaleString()}</span>
          </div>
          <img src={post.imagemUrl} alt="Publicação" className="post-image" />
          <p className="post-texto">{post.texto}</p>
          <div className="post-acoes">
            <button onClick={() => toggleCurtir(post.id)} className="curtir-btn">
              {post.curtido ? "❤️ Curtido" : "🤍 Curtir"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
