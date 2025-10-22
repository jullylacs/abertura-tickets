### Abertura-Tickets
## Descrição

O projeto Abertura-Tickets é uma aplicação web para abertura e controle de tickets de suporte/serviços, desenvolvida com Next.js e Prisma (ORM) — oferecendo uma interface moderna e funcional para registrar, visualizar e gerenciar solicitações.
Ele permite que usuários autentiquem-se, abram tickets, visualizem históricos e que administradores ou equipe de suporte acompanhem e atualizem os status desses tickets.

Funcionalidades principais

Autenticação de usuários (login/cadastro)

Abertura de tickets com título, descrição e categoria

Listagem de tickets (por usuário, por status)

Visualização de detalhes de cada ticket

Alteração de status dos tickets (ex: aberto, em andamento, concluído)

Persistência de dados com banco via Prisma

Front-end responsivo construído com Next.js + Tailwind CSS

Tecnologias utilizadas

Next.js (React)

TypeScript

Tailwind CSS

Prisma ORM

Banco de dados (ex: PostgreSQL / MySQL – conforme configuração)

(Opcional) Vercel para deploy

Outros: ESLint, PostCSS, etc

Instalação e configuração

Estas instruções assumem que você já tem Node.js (versão >= 16) instalado.

# Clone o repositório
git clone https://github.com/jullylacs/abertura-tickets.git
cd abertura-tickets

# Instale as dependências
npm install
# ou
yarn
# ou
pnpm install

# Configure variáveis de ambiente
# Crie um arquivo `.env` com pelo menos:
#   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedb?schema=public"
#   NEXTAUTH_URL="http://localhost:3000"
#   NEXTAUTH_SECRET="uma-senha-forte-aqui"
#   etc.

# Execute migrações do Prisma (caso haja)
npx prisma migrate dev    # ou prisma db push, conforme setup

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev

# Abra no navegador:
http://localhost:3000

Estrutura de pasta (resumo)
/
├─ prisma/                 -- esquemas e migrações do banco
├─ public/                 -- arquivos públicos (imagens, ícones, etc)
├─ scripts/                -- scripts auxiliares (seed, etc)
├─ src/
│   ├─ pages/              -- rotas do Next.js
│   ├─ components/         -- componentes reutilizáveis UI
│   ├─ lib/                -- bibliotecas e utilitários
│   ├─ models/             -- definições de tipos e entidades (opcional)
│   └─ styles/             -- estilos globais, Tailwind config, etc
├─ next.config.js/.ts      -- configuração do Next.js
├─ tailwind.config.js      -- configuração do Tailwind CSS
├─ tsconfig.json           -- configuração TypeScript
└─ package.json

Uso

Usuário realiza login ou cadastro

Usuário abre um novo ticket preenchendo título, descrição e selecionando categoria

Usuário ou equipe de suporte podem visualizar a lista de tickets (filtrados por status ou usuário)

Um ticket pode ser atualizado: por exemplo-mudar seu status, adicionar comentários (se implementado)

Administradores podem fechar/resolver tickets e gerar relatórios ou histórico (dependendo da extensão do projeto)

Testes

Se houverem testes configurados, você pode rodá-los com:

npm run test
# ou
yarn test
# ou
pnpm test