# 📚 EduConnect - Backend

Este é o backend da plataforma **EduConnect**, uma solução para facilitar a comunicação e organização em ambientes educacionais. A aplicação é construída com **Node.js**, **Express**, **Prisma** e **TypeScript**.

---

## 🚀 Funcionalidades

- ✅ **Autenticação de Usuários**
  - Registro e login
  - JWT para autenticação segura
- 📬 **Mensagens Internas**
  - Envio de mensagens para um ou mais usuários
  - Histórico de mensagens enviadas e recebidas
  - Suporte a **WebSockets** para mensagens em tempo real
- 🧑‍🏫 **Sistema de Usuários**
  - Listagem de usuários (excluindo o usuário logado)
  - Organização por papéis (ex: aluno, professor)
- 💬 **Integração com Frontend**
  - API pronta para ser consumida por frontends React, Construct 3, etc.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Socket.io](https://socket.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## 📁 Estrutura de Pastas

```
/backend
├── src/
│   ├── controllers/       # Lógica dos endpoints
│   ├── routes/            # Definição das rotas da API
│   ├── services/          # Regras de negócio
│   ├── prisma/            # Cliente e schema do Prisma
│   └── socket.ts          # Integração com WebSockets
├── .env                   # Variáveis de ambiente
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/andretheodoro/EduConnect.git
cd EduConnect/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/educonnect
JWT_SECRET=sua_chave_secreta
```

### 4. Execute as migrations

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
npm run dev
```

---

## ✅ Endpoints da API

> A API **não utiliza Swagger** ou outras bibliotecas de documentação. Abaixo estão os principais endpoints disponíveis:

### 📌 Autenticação

- `POST /auth/register` – Cria um novo usuário
- `POST /auth/login` – Retorna um token JWT válido

### 👤 Usuários

- `GET /users/:email` – Lista todos os usuários, exceto o atual

### 💬 Mensagens

- `POST /messages/send` – Envia uma nova mensagem
- `GET /messages/received/:email` – Lista mensagens recebidas
- `GET /messages/sent/:email` – Lista mensagens enviadas

---

## 🔌 WebSocket

A API suporta comunicação em tempo real via **Socket.io**:

- Evento `sendMessage` – Envia mensagem para destinatários conectados
- Evento `new_message` – Notificação em tempo real para mensagens recebidas

---

## 🧪 Testes

> *(A API ainda não possui testes automatizados. Sugestão futura: Jest + Supertest)*

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests com melhorias, sugestões ou correções.

---