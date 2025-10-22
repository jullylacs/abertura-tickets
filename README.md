# 🎫 Abertura-Tickets

> Sistema simples e moderno para **abertura e gestão de tickets de suporte**.  
> Desenvolvido com **Next.js**, **Prisma** e **TypeScript**.

---

## 📋 Sumário
- [Descrição](#-descrição)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Modelo de Dados (Prisma)](#-modelo-de-dados-prisma)
- [Instalação e Execução](#-instalação-e-execução)
- [Documentação da API](#-documentação-da-api)
- [Fluxo do Sistema](#-fluxo-do-sistema)
- [Testes](#-testes)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🧾 Descrição

O **Abertura-Tickets** é uma aplicação web para **registrar e acompanhar tickets de suporte técnico**.  
Usuários podem criar solicitações, visualizar o histórico e acompanhar o andamento.  
A equipe de suporte pode alterar status, responder e encerrar tickets.

> 💡 Foco em escalabilidade, boas práticas e uma interface intuitiva.

---

## 🚀 Funcionalidades

✅ Autenticação de usuários (login e cadastro)  
✅ Criação e listagem de tickets  
✅ Atualização de status (aberto, em andamento, concluído)  
✅ Filtros por status e usuário  
✅ Interface responsiva com Tailwind CSS  
✅ Persistência via Prisma ORM  

---

## 🧰 Tecnologias

| Camada | Tecnologias |
|:-------|:-------------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS |
| **Backend** | API Routes (Next.js), Prisma ORM |
| **Banco de Dados** | PostgreSQL (ou compatível) |
| **Autenticação** | NextAuth.js |
| **Infraestrutura** | Node.js, Vercel |

---


---

## 🗄️ Modelo de Dados (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  tickets   Ticket[]
  createdAt DateTime @default(now())
}

model Ticket {
  id          String   @id @default(cuid())
  title       String
  description String
  status      Status   @default(OPEN)
  user        User     @relation(fields: [userId], references: [id])
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}

# Clone o repositório
git clone https://github.com/jullylacs/abertura-tickets.git
cd abertura-tickets

# Instale as dependências
npm install
# ou
yarn

# Configure o arquivo .env
cp .env.example .env
# Edite DATABASE_URL, NEXTAUTH_SECRET, etc.

# Execute migrações do Prisma
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse no navegador:
http://localhost:3000
