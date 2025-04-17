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
| **Chart.js** | Criação de gráficos de notas e frequência |
| **Socket.IO**   | Comunicação em tempo real (chat) |
| **React Router DOM** | Gerenciamento de rotas da aplicação |
| **Axios**       | Requisições HTTP para o backend |
| **React Icons** | Ícones visuais para navegação |
| **React-calendar** | Criação do Calendário Escolar |
| **Daily.co** | Integração para chamadas de vídeo |

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

## 🚀 Próximos Passos do Projeto EduConnect

Confira abaixo as próximas etapas previstas para a evolução do EduConnect:

- ✅ **Implementação de Funcionalidades CRUD**  
  Gravação, exclusão e pesquisa de dados gerais do sistema.  
  *(Atualmente, os dados estão sendo inseridos manualmente via banco de dados.)*

- 📊 **Implementação de Análises Avançadas**  
  Utilização de Inteligência Artificial para gerar insights sobre o desempenho acadêmico e o bem-estar emocional dos alunos.

- 👨‍👩‍👧‍👦 **Expansão de Funcionalidades para Pais e Responsáveis**  
  Inclusão de módulos específicos que possibilitam o acompanhamento da rotina escolar dos alunos pelos responsáveis.

- 🕹️ **Games de Aprendizagem**  
  Desenvolvimento de uma mecânica de gamificação com sistema de pontos, medalhas e recompensas por participação em atividades.

- 🌐 **Integração com Comunidade e Escolas Próximas**  
  Criação de um **Fórum Educacional** colaborativo para debates sobre metodologias, desafios pedagógicos e boas práticas.

- 📱 **Expansão para Plataforma Mobile**  
  Desenvolvimento da versão mobile com as mesmas funcionalidades da versão web, garantindo uma experiência 100% responsiva.

- 🤝 **Parcerias Estratégicas**  
  Estabelecimento de colaborações com instituições educacionais para realização de testes e validações em ambientes reais.

---

## 🖼️ Telas do Sistema

Abaixo estão as principais telas desenvolvidas para o EduConnect. Cada uma delas possui funcionalidades específicas pensadas para facilitar a experiência de alunos, professores e gestores escolares:

- 🔐 **Login**  
  Tela de autenticação para acesso ao sistema.
![image](https://github.com/user-attachments/assets/715d7c65-6552-4c01-8aff-eefa39c7eb2f)

- 🏠 **Home**

  Tela Inicial com informações principais de gerenciamento e alertas aos usuários
  
- 👨‍🎓 Parte Aluno:

  
- 👩‍🏫 Parte Professor:

- 👤 **Perfil do Usuário**

  Tela de Perfil do Usuário contendo as informações básicas do seu usuário.
![image](https://github.com/user-attachments/assets/a3936b42-c66d-47af-8d71-1991dc126729)

- 📰 **Feed Escolar**  
  Rede social interna para postagens, interações e comentários.
![image](https://github.com/user-attachments/assets/01ad7d66-f8d8-4191-ba6d-f3ab7e41f32d)

- 📊 **Frequências e Notas**  
  Visualização de gráficos com desempenho acadêmico e frequência.

- 👨‍🎓 Parte Aluno:
  
![image](https://github.com/user-attachments/assets/acada10e-b4b0-45bf-b76b-d06915320d4c)
![image](https://github.com/user-attachments/assets/5c7919f3-5dec-43be-885e-5320cbd60b73)
![image](https://github.com/user-attachments/assets/b735f3fc-f65e-4366-a65e-308c13cd0876)

- 👩‍🏫 Parte Professor:
  
![image](https://github.com/user-attachments/assets/c13c4977-9fd6-47c0-9ea3-ac00dcac38ff)
![image](https://github.com/user-attachments/assets/4223b0b5-0947-41e9-b986-814041bc6240)
![image](https://github.com/user-attachments/assets/1e4ad1bd-91f8-4b8c-8f88-c00ed392a136)

- 💬 **Mensagens Privadas**  
  Comunicação direta entre alunos e professores em tempo real.
  ![image](https://github.com/user-attachments/assets/e09dfbd5-12a1-49b7-bbd4-5cb56a79fcaf)

- 📅 **Calendário Escolar**  
  Exibição de eventos, reuniões e datas importantes por mês.
![image](https://github.com/user-attachments/assets/d41d6e6f-c587-4b53-8d78-e1a37c47caa1)

- 😊 **Saúde e Bem-estar**  
  Questionário emocional com análise visual dos dados.

- 👨‍🎓 Parte Aluno:
  
![image](https://github.com/user-attachments/assets/2dae2e0f-49fd-415f-9548-2af17780d4f5)

- 👩‍🏫 Parte Professor:
  
![image](https://github.com/user-attachments/assets/b8565520-40f9-4fdc-a859-1838d666816f)
![image](https://github.com/user-attachments/assets/a8d5013d-6a4c-4681-97d5-2c1fe12bb69c)

- 📚 **Biblioteca Digital**  
  Upload e download de materiais didáticos com capa e data.

- 👨‍🎓 Parte Aluno:
  
![image](https://github.com/user-attachments/assets/773f8ffa-9a47-4b23-b025-764b226104af)

- 👩‍🏫 Parte Professor:
  
![image](https://github.com/user-attachments/assets/c5ce7c5e-df85-4cf4-9a6d-9275c2a81564)

- 🤖 **Assistente Virtual**  
  Chat com inteligência artificial para dúvidas pedagógicas.
![image](https://github.com/user-attachments/assets/d0ab475e-4f55-48c4-b350-97da59e07ad1)

- 🎥 **Videoconferência**  
  Criação e acesso a salas virtuais para reuniões e aulas online.
![image](https://github.com/user-attachments/assets/119e8af4-da4f-4d1d-b07d-28814f52ecf6)
![image](https://github.com/user-attachments/assets/81e3a2ff-6bed-4d3b-9b0d-b513ed75f59e)
  
## 📝 Licença

Este projeto está sob a Licença MIT.

