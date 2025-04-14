# 🎓 EduConnect - Frontend

Este é o frontend da plataforma **EduConnect**, uma solução educacional que facilita a comunicação e organização entre alunos e professores. A aplicação é construída com **React**, **TypeScript** e **Material UI**, proporcionando uma interface moderna e responsiva.

---

## 🚀 Funcionalidades

- **Autenticação de Usuários**
  - Registro e login com validação de credenciais
  - Armazenamento seguro de tokens JWT

- **Mensagens Internas**
  - Envio de mensagens para um ou mais usuários
  - Visualização de mensagens enviadas e recebidas
  - Indicação de mensagens não lidas

- **Listagem de Usuários**
  - Exibição de todos os usuários cadastrados (exceto o usuário logado)
  - Busca e filtragem de usuários por nome ou email

- **Acompanhamento Acadêmico**
  - Visualização de conteúdos das aulas por disciplina
  - Acesso às notas de avaliações por disciplina
  - Consulta de faltas por disciplina
  - Visualização de horários de aulas

- **Financeiro**
  - Consulta de boletos pagos e em aberto
  - Visualização de datas de vencimento e valores
  - Pagamento de mensalidades via cartão de crédito e PIX

- **Notificações e Avisos**
  - Recebimento de notificações em tempo real
  - Visualização de avisos de ocorrências e inadimplência

- **Materiais e Documentos**
  - Acesso a materiais disponibilizados pelos professores
  - Emissão de documentos acadêmicos

- **Biblioteca**
  - Acesso à biblioteca para pesquisas

- **Carteirinha Estudantil**
  - Visualização da carteirinha estudantil digital

---

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)

---

## 📁 Estrutura de Pastas

```
/frontend
├── public/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Serviços de API
│   ├── contexts/         # Contextos de autenticação e temas
│   ├── hooks/            # Hooks personalizados
│   └── App.tsx           # Componente principal
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Como Rodar Localmente

1. **Clone o repositório**

```bash
git clone https://github.com/andretheodoro/EduConnect.git
cd EduConnect/frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL=http://localhost:3000
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 🔗 Integração com o Backend

Certifique-se de que o backend da aplicação esteja rodando corretamente. O frontend se comunica com a API para realizar operações de autenticação, envio e recebimento de mensagens, e listagem de usuários.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias, sugestões ou correções.