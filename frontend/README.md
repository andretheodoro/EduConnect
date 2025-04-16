# 🎓 EduConnect - Frontend

**EduConnect** é uma plataforma educacional interativa que conecta professores e alunos, promovendo a colaboração, o acompanhamento do desempenho e o bem-estar estudantil, focando em uma solução para facilitar a comunicação e organização em ambientes educacionais. Este repositório corresponde ao **frontend da aplicação**, desenvolvido com React e TypeScript.

---

## ✨ Funcionalidades Implementadas

## 🌟 Funcionalidades do Sistema

### 1. 🔐 **Autenticação**
- Tela de Login com validação de credenciais.
- Armazenamento de token JWT no `localStorage`.
- Redirecionamento automático para o painel após login bem-sucedido.
- Logout funcional via botão no header.

### 2. 🧭 **Dashboard / Tela Inicial**
- Exibição de cards com atalhos para funcionalidades principais:
  - 📊 Frequências e Notas  
  - ❤️ Saúde e Bem-estar  
  - 💬 Chat (mensagens)

### 3. 📚 **Sidebar (Menu Lateral)**
- Ícone de hambúrguer para expandir/retrair o menu.
- Itens de menu com ícones e nomes:
  - 🏠 Início (Página Inicial)  
  - 📰 Feed  
  - 📁 Biblioteca Digital  
  - 📈 Frequências e Notas  
  - 💬 Mensagens (Chat Privado)  
  - 🤖 Assistente Virtual - Professores  
  - 📆 Calendário Escolar  
  - ❤️ Saúde e Bem-estar  
  - 🎥 Vídeoconferência (ATPC) - Professores

### 4. 🧢 **Header (Cabeçalho Superior)**
- 👤 Ícone do usuário no canto direito para acesso ao seu Perfil.
- 🔓 Botão de logout.
- Estilo fixo e responsivo.

### 5. 📰 **Feed**
- Rede social educacional.
- Posts com textos e imagens.
- 👍 Opção para curtir/descurtir publicação.

### 6. 📁 **Biblioteca Digital**
- 📤 Upload de arquivos (PDF e imagens).
- 📋 Listagem com capa, nome, data e botão de download.
- 📚 Exibição de materiais disponíveis.

### 7. 📈 **Frequências e Notas**
- 📊 Gráficos interativos (Bar, Line, Doughnut).
- 🔍 Filtros por disciplina e turmas.
- 🚨 Tabela de alertas de desempenho e faltas.

### 8. 💬 **Chat Privado (Mensagens)**
- ✉️ Envio de mensagens privadas via Socket.IO.
- 🕓 Histórico de mensagens.
- 🔔 Recebimento de notificações em tempo real.

### 9. 🤖 **Assistente Virtual**
- Chatbot com IA simulada.
- Respostas automáticas para dúvidas pedagógicas.

### 10. 📆 **Calendário Escolar**
- 📅 Exibição mensal de eventos.
- 🕒 Detalhes com hora, descrição e cor por tipo de evento.
- 🎨 Layout visual e intuitivo.

### 11. ❤️ **Saúde e Bem-Estar**
- 😊 Questionário com emoticons para sentimentos em áreas como:
  - 👨‍👩‍👧‍👦 Família  
  - 👯 Amigos  
  - 🌈 Felicidade
- 📊 Exibição analítica para professores com gráficos coloridos e alertas.

### 12. 🎥 **Videoconferência (ATPC)**
- 💻 Videochamadas em tempo real via nomes de sala.
- 🔗 Integração com [Daily.co](https://www.daily.co).

---

## 🧩 Tecnologias Utilizadas

| Tecnologia      | Descrição |
|----------------|-----------|
| **React**       | Biblioteca para construção da UI |
| **TypeScript**  | Tipagem estática para maior robustez |
| **Tailwind CSS**| Utilizado para estilização e responsividade |
| **Chart.js / Recharts** | Criação de gráficos de notas e frequência |
| **Socket.IO**   | Comunicação em tempo real (chat) |
| **React Router DOM** | Gerenciamento de rotas da aplicação |
| **Axios**       | Requisições HTTP para o backend |
| **React Icons** | Ícones visuais para navegação |
| **Framer Motion** | Animações suaves nos componentes |

---

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Imagens e ícones
├── components/          # Componentes reutilizáveis (Sidebar, Header, Cards, etc.)
│   ├── layout/          # Estrutura da página base
│   └── ui/              # Elementos de interface como Botões, Cards, etc.
├── pages/               # Páginas principais
│   ├── Login/           
│   ├── Home/            
│   ├── NotasFrequencias/
│   ├── Biblioteca/
│   ├── BemEstar/
│   ├── Calendario/
│   ├── Chat/
│   └── AssistenteVirtual/
├── services/            # Integração com APIs (ex: axios.ts)
├── styles/              # Estilos globais
├── App.tsx              # Componente raiz
└── main.tsx             # Ponto de entrada da aplicação
```

---

## ▶️ Como Executar

### Pré-requisitos
- Node.js v18 ou superior
- npm ou yarn

### Instalação

```bash
git clone https://github.com/andretheodoro/EduConnect.git
cd EduConnect/frontend
npm install
npm start
```

Acesse via `http://localhost:3001`

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e com base no `.env-example`:

| Variável               | Descrição                                                                 | Exemplo                                      |
|------------------------|---------------------------------------------------------------------------|----------------------------------------------|
| `PORT`          | Porta a qual a aplicação irá rodar                                       | `3001`                                 |
| `REACT_APP_BACKEND_URL`        | URL a qual a aplicação backend estará em execução                                               | `http://localhost:3000`                                      |

---

## 🔗 Integração com o Backend

Certifique-se de que o backend da aplicação esteja rodando corretamente. O frontend se comunica com a API para realizar operações de autenticação, envio e recebimento de mensagens, e listagem de usuários.

---


## ✅ Melhorias Futuras

- Integração real com backend para todos os módulos
- Autenticação OAuth (Google ou Microsoft)
- Responsividade avançada
- Temas claro/escuro
- Acessibilidade aprimorada
- IA real para o assistente virtual

---

## 📝 Licença

Este projeto está sob a Licença MIT.
