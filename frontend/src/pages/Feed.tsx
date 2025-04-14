import React, { useState, useEffect, ChangeEvent } from "react";
import api from "../services/api"; // aqui usamos o api.ts
import "../styles/Feed.css";
import { useUsuario } from '../hooks/useUsuario';
import { Box, Button } from "@mui/material";
import { FiPaperclip, FiSend } from "react-icons/fi";

interface Postagem {
  id: number;
  autor: string;
  texto: string;
  imagem_url: string;
  data: string;
  curtido: boolean;
  liked_by: number[];
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const usuario = useUsuario();

  const userId = usuario?.id || 0;

  // Carregar os posts ao montar o componente
  useEffect(() => {
    const fetchPosts = async () => {
      if (!usuario) return;

      try {
        // Chamando a API para pegar todos os posts
        const response = await api.get("/feed");

        const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;

        console.log(userId);
        console.log(response.data);
        // Formatando os posts recebidos da API
        const postsFormatados = response.data.map((post: any) => ({
          id: post.id,
          autor: post.author,
          texto: post.text,
          imagem_url: `${backendBaseUrl}${post.image_url}`, // URL dinâmica
          data: post.created_at,
          curtido: post.liked_by.includes(userId),
          liked_by: post.liked_by,
        }));

        // Definindo os posts no estado
        setPosts(postsFormatados);
      } catch (error) {
        console.error("Erro ao carregar o feed:", error);
      }
    };

    // Chama a função para carregar os posts
    fetchPosts();
  }, [usuario]); // A dependência vazia garante que isso seja executado uma vez ao montar o componente

  // Função de upload de imagem
  const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovaImagem(file);
      setPreviewImagem(URL.createObjectURL(file));
    }
  };

  // Função de postagem
  const handlePostar = async () => {
    if (!texto || !novaImagem) {
      alert("Preencha o texto e selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("text", texto);
    formData.append("user_id", String(userId));
    formData.append("image", novaImagem);

    try {
      const response = await api.post("/feed", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const novoPost = {
        id: response.data.id,
        autor: "Você",
        texto: response.data.text,
        imagem_url: `${window.location.origin}${response.data.image_url}`, // URL dinâmica
        data: response.data.created_at,
        curtido: false,
        liked_by: [],
      };

      setPosts([novoPost, ...posts]);
      setTexto("");
      setNovaImagem(null);
      setPreviewImagem(null);
    } catch (error) {
      console.error("Erro ao postar:", error);
    }
  };

  // Função de curtir
  const toggleCurtir = async (id: number) => {
    try {
      const response = await api.put(`/feed/${id}/like`, {
        user_id: userId,
      });

      const updatedLikes = response.data.liked_by;

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
              ...p,
              curtido: updatedLikes.includes(userId),
              liked_by: updatedLikes,
            }
            : p
        )
      );
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
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

        {previewImagem && <img src={previewImagem} alt="Prévia" className="preview-img" />}

        <Box className="botoes-feed">
          <label htmlFor="upload-input">
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImagemChange}
            />
            <Button
              variant="contained"
              color="success"
              component="span"
              sx={{ textTransform: 'none' }}
            >
              <FiPaperclip style={{ marginRight: 8, marginTop: 2 }} />
              Anexar imagem
            </Button>
          </label>


          <Button
            variant="contained"
            color="primary"
            onClick={handlePostar}
            sx={{ textTransform: 'none' }}
          >
            <FiSend style={{ marginRight: 8, marginTop: 2 }} />
            Publicar
          </Button>
        </Box>

        {/* <div className="botoes-feed">
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
        </div> */}
      </div>

      {posts.length === 0 ? (
        <p>Não há posts para exibir.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <strong>{post.autor}</strong>
              <span>{new Date(post.data).toLocaleString()}</span>
            </div>
            <img src={post.imagem_url} alt="Publicação" className="post-image" />
            <p className="post-texto">{post.texto}</p>
            <div className="post-acoes">
              <div className="curtida-container">
                <button onClick={() => toggleCurtir(post.id)} className="curtir-btn">
                  {post.curtido ? "❤️ Curtido" : "🤍 Curtir"}
                </button>
                <span className="curtidas-badge">
                  {post.liked_by.length} curtida{post.liked_by.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
