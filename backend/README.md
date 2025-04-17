# 📚 EduConnect - Backend

**EduConnect** é uma plataforma educacional interativa que conecta professores e alunos, promovendo a colaboração, o acompanhamento do desempenho e o bem-estar estudantil, focando em uma solução para facilitar a comunicação e organização em ambientes educacionais. Este repositório corresponde ao **backend da aplicação**, desenvolvido com Node.js e TypeScript.

---

## ✨ Funcionalidades Implementadas
O backend do EduConnect foi desenvolvido em Node.js com Express, estruturado em controllers para separar responsabilidades. Abaixo estão descritas todas as funcionalidades implementadas no backend:

### 🔐 1. **Autenticação e Autorização**
- Login de usuários (alunos e professores) com validação de credenciais.
- Geração e verificação de tokens JWT para autenticação.
- Controle de acesso baseado em papéis (aluno, professor).

### 👥 2. **Gerenciamento de Perfil**
- Consulta do Perfil do Usuário logado.
  
### 📊 3. **Gerenciamento de Frequência e Notas - Professor**
- Lançamento e consulta de notas gerais por disciplina.
- Lançamento e consulta de frequências gerais por disciplina.
- Geração de alertas aos professores para acompanhamento.

### 🎓 4. **Gerenciamento de Frequência e Notas - Aluno**
- Visualização de notas e frequência por aluno
  
### 📚 5. **Biblioteca Digital**
- Upload de materiais didáticos.
- Visualização de materiais didáticos.

### 💚 6. **Saúde e Bem-Estar**
- Registro de informações relacionadas ao bem-estar dos alunos.
- Monitoramento de indicadores de saúde emocional.
- Geração de alertas para acompanhamento.
- Acompanhamento lúdico e visual do estado emocional dos alunos

### 📅 7. **Calendário Escolar**
- Criação e gerenciamento de eventos escolares.
- Associação de eventos a usuários e disciplinas.
- Exibição por mês para alunos e professores

### 💬 8. **Chat Privado (Mensagens)**
- Suporte a WebSockets para mensagens em tempo real entre usuários.
- Histórico de mensagens enviadas e recebidas.
- Notificações de novas mensagens.

### 🤖 9. **Assistente Virtual**
- Integração com serviços de inteligência artificial (OpenAI) para suporte aos usuários.
- Bloqueio de pesquisa à termos sensíveis.
- Geração de respostas automáticas para dúvidas pedagógicas
- Apoio a professores e alunos com base em IA (OpenAI)

### 📰 10. **Feed**
- Sistema de rede social interna para a comunidade escolar:
- Postagens com imagens e textos por professores e alunos
- Curtidas
- Visualização de feed por data
  
---

## 🧩 Tecnologias Utilizadas

| Tecnologia      | Descrição |
|----------------|-----------|
| **Node.js**       | Ambiente de execução JavaScript no servidor |
| **TypeScript**  | Superset do JavaScript que adiciona tipagem estática |
| **Express** | Framework web para Node.js |
| **Prisma**   | ORM para interagir com o banco de dados |
| **JWT** | Autenticação baseada em tokens JSON Web Tokens |
| **Docker** | Containerização da aplicação |
| **Socket.IO** | Comunicação em tempo real para o chat |
| **PostgreSQL** | Banco de dados relacional |
| **Nodemailer** | Envio de e-mails para notificações e recuperação de senha |

---

## 📁 Estrutura do Projeto

```
backend/
├── .vscode/              # Configurações do editor
├── prisma/               # Esquemas e migrações do banco de dados
├── src/                  # Código-fonte principal
│   ├── controllers/      # Lógica de controle das rotas
│   ├── middlewares/      # Middlewares para tratamento de requisições
│   ├── routes/           # Definição das rotas da API
│   ├── services/         # Serviços para regras de negócio
│   ├── utils/            # Utilitários e funções auxiliares
│   └── index.ts          # Ponto de entrada da aplicação
├── .env-example          # Arquivo exemplo para criação do arquivo .env - variáveis de ambiente
├── docker-compose.yml    # Configuração do Docker Compose
├── dockerfile            # Dockerfile para containerização
├── package.json          # Dependências e scripts do projeto
├── tsconfig.json         # Configurações do TypeScript
└── README.md             # Documentação do projeto
```

---

## ▶️ Como Executar

### Pré-requisitos
- Node.js v18 ou superior
- Docker e Docker Compose
- PostgreSQL

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/andretheodoro/EduConnect.git
cd EduConnect/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

O arquivo `.env-example` fornece um modelo. Para utilizá-lo:

1. Copie o conteúdo de `.env.example` para um novo arquivo chamado `.env`.
2. Preencha os valores conforme o seu ambiente local ou de produção.

### 🔧 Variáveis Obrigatórias

| Variável               | Descrição                                                                 | Exemplo                                      |
|------------------------|---------------------------------------------------------------------------|----------------------------------------------|
| `POSTGRES_DB`          | Nome do banco de dados PostgreSQL.                                        | `educonnect`                                 |
| `POSTGRES_USER`        | Usuário do banco de dados.                                                | `admin`                                      |
| `POSTGRES_PASSWORD`    | Senha do banco de dados.                                                  | `senha123`                                   |
| `DB_HOST`              | Host onde o banco de dados está hospedado.                                | `localhost` ou `db` (em containers Docker)   |
| `DB_PORT`              | Porta de conexão do banco de dados.                                       | `5432`                                       |
| `PORT`                 | Porta na qual o backend será executado.                                   | `3000`                                       |
| `JWT_SECRET`           | Chave secreta usada para assinar os tokens JWT (autenticação).            | `minha_chave_secreta_super_segura`           |
| `OPENAI_API_KEY`       | Chave de API da OpenAI (para integração com o assistente virtual).        | `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`    |
| `DATABASE_URL`         | URL completa de conexão com o banco (útil para deploy em nuvem).          | `postgresql://user:pass@host:port/dbname`    |
| `PASSWORD_USER_DEFAULT`| Senha padrão atribuída ao criar novos usuários automaticamente.           | `educonnect123`                              |
---

### 🛡️ Boas práticas

- **Não versionar**: Nunca versionar o arquivo `.env` real com dados sensíveis. Mantenha o `.env.example` para referência.
- **Senhas seguras**: Use senhas fortes e considere utilizar variáveis separadas para ambientes de produção, testes e desenvolvimento.
- **OpenAI API**: Para usar funcionalidades com IA (como o assistente pedagógico), uma chave válida da OpenAI é obrigatória.

4. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

5. Inicie a aplicação:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

## Docker

Este projeto utiliza Docker para configurar e orquestrar o ambiente de desenvolvimento e produção, facilitando o processo de configuração e execução de containers para o back-end e banco de dados.

### Configurar o Docker

O projeto já possui o arquivo docker-compose.yml configurado para definir os containers necessários para rodar o back-end e o banco de dados PostgreSQL. Para subir os containers, execute o seguinte comando:

```bash
docker-compose up --build
```

Esse comando irá construir e iniciar os containers do Docker.

---

## 📌 Endpoints da API

### 🧑‍🎓 Alunos (`alunosRoutes.ts`)
- `GET /api/alunos/turmas` – Lista todas as turmas (classes) dos alunos.

### 🤖 Assistente Virtual (`assistenteRoutes.ts`)
- `POST /api/assistente` – Pergunta ao assistente (OpenAI).

### 🔐 Autenticação (`authRoutes.ts`)
- `POST /api/login` – Login.
- `POST /api/gerar-hash` – Método de teste para geração de hase baseado em uma senha (login).

### 🧠 Bem-Estar (`bemEstarRoutes.ts`)
- `POST /api/bem-estar/respostas` – Envia resposta do questionário respondido pelos alunos.
- `GET /api/bem-estar/estatisticas` – Obtém estatisticas referente as respostas de bem-estar dos alunos para exibição aos professores.
- `GET /api/bem-estar/respostas-alunos` – Obtém as respostas enviadas pelos alunos referentes ao questionário de bem-estar emocional.
- `GET /api/bem-estar/respostas/:usuarioId` – Obtém as respostas enviadas por um aluno em específico (:usuarioId) referentes ao questionário de bem-estar emocional.

### 📅 Eventos (`eventosRoutes.ts`)
- `GET /api/eventos` – Lista eventos.
- `POST /api/eventos` – Cria evento.
- `GET /api/eventos/:usuarioId` – Retorna eventos do usuário (:usuarioId).

### 📰 Feed (`feedRoutes.ts`)
- `GET /api/feed` – Lista postagens.
- `POST /api/feed` – Cria postagem.
- `PUT /api/feed/:id/like` – Atualiza "curtida" da postagem específica (:id).

### 📊 Frequências (`frequenciasRoutes.ts`)
- `GET /api/frequencias/media` – Retorna média de frequência geral de todos os alunos.
- `GET /api/frequencias/aluno/:alunoId` – Retorna média de frequência somente do aluno específico (:alunoId).

### 💬 Mensagens (`messageRoutes.ts`)
- `POST /send` – Envia mensagem.
- `GET /sent/:userId` – Listar mensagens enviadas por usuário.
- `GET /received/:userId` – Listar mensagens recebidas por usuário.
- `PATCH /mark-as-read/:id` – Marcar mensagem como lida.

### 📝 Notas (`notasRoutes.ts`)
- `GET /api/notas/media` – Retorna média de notas geral de todos os alunos.
- `GET /api/notas/disciplinas` – Retorna as disciplinas (subject -> GRADES) das notas lançadas.
- `GET /api/notas/aluno/:alunoId` – Retorna média de notas somente do aluno específico (:alunoId).

### 🏫 Turmas (`turmasRoutes.ts`)
- `GET /api/turmas` – Lista turmas.

### 📁 Uploads (`uploadRoutes.ts`)
- `GET /materiais` – Lista todos arquivos/materais que foram realizados uploads pelos professores.

### 👤 Usuários (`userRoutes.ts`)
- `POST /register` – Cria novo usuário.
- `GET /users` – Lista usuários.
- `GET /users/:id` – Detalhes do usuário.
- `GET /profile/:userId` – Retorna perfil do usuário.
---

## ✅ Melhorias Futuras

- Implementação de testes automatizados.
- Integração com serviços de terceiros para análise de dados.
- Melhoria na escalabilidade e performance da aplicação.
- Documentação da API com Swagger.
---

## 📝 Licença

Este projeto está sob a Licença MIT.
