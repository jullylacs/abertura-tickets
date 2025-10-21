"use client";

import { useState, useEffect, useCallback } from "react";

type User = {
  id: string;
  name: string;
  role: "funcionario" | "tecnico";
};

type Ticket = {
  _id: string;
  title: string;
  status: "Aberto" | "Em Andamento" | "Resolvido";
  createdBy: User;
  assignedTo?: User;
  priority: "Baixa" | "Média" | "Alta";
};

const mockUsers: User[] = [
  { id: "u1", name: "João Silva", role: "funcionario" },
  { id: "u2", name: "Maria Oliveira", role: "funcionario" },
  { id: "u3", name: "Carlos Técnico", role: "tecnico" },
];

const mockTickets: Ticket[] = [
  {
    _id: "t1",
    title: "Não consigo acessar o sistema",
    status: "Aberto",
    createdBy: mockUsers[0],
    assignedTo: undefined,
    priority: "Alta",
  },
  {
    _id: "t2",
    title: "Erro na impressora",
    status: "Em Andamento",
    createdBy: mockUsers[1],
    assignedTo: mockUsers[2],
    priority: "Média",
  },
  {
    _id: "t3",
    title: "Computador lento",
    status: "Resolvido",
    createdBy: mockUsers[0],
    assignedTo: mockUsers[2],
    priority: "Baixa",
  },
];

function Login({
  onLogin,
}: {
  onLogin: (user: User) => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <p className="mb-4">Selecione seu usuário para entrar:</p>
      <ul className="space-y-4">
        {mockUsers.map((u) => (
          <li key={u.id}>
            <button
              onClick={() => onLogin(u)}
              className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              aria-label={`Entrar como ${u.name}, ${u.role === "tecnico" ? "Técnico" : "Funcionário"}`}
            >
              {u.name} ({u.role === "tecnico" ? "Técnico" : "Funcionário"})
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

function TicketItem({
  ticket,
  currentUser,
  onAssign,
  isAssigning,
}: {
  ticket: Ticket;
  currentUser: User;
  onAssign: (ticketId: string) => void;
  isAssigning: boolean;
}) {
  const isAssignable = currentUser.role === "tecnico" && !ticket.assignedTo;

  const statusColor = {
    Aberto: "text-red-600",
    "Em Andamento": "text-yellow-600",
    Resolvido: "text-green-600",
  };

  return (
    <li className="border rounded p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-bold text-lg">{ticket.title}</h3>
      <p>
        Status:{" "}
        <span className={`font-semibold ${statusColor[ticket.status]}`}>
          {ticket.status}
        </span>
      </p>
      <p>Prioridade: {ticket.priority}</p>
      <p>
        Técnico responsável:{" "}
        {ticket.assignedTo ? ticket.assignedTo.name : "Não atribuído"}
      </p>
      {isAssignable && (
        <button
          onClick={() => onAssign(ticket._id)}
          disabled={isAssigning}
          className={`mt-2 px-3 py-1 rounded text-white transition ${
            isAssigning
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          aria-label={`Atribuir ticket ${ticket.title} a mim`}
        >
          {isAssigning ? "Atribuindo..." : "Atribuir a mim"}
        </button>
      )}
    </li>
  );
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [assigningTicketId, setAssigningTicketId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (user.role === "funcionario") {
        setTickets(mockTickets.filter((t) => t.createdBy.id === user.id));
      } else {
        setTickets(mockTickets);
      }
    }
  }, [user]);

  const handleAssignToMe = useCallback(
    (ticketId: string) => {
      if (!user) return;

      setAssigningTicketId(ticketId);

      // Simula delay de rede/ação
      setTimeout(() => {
        alert(`Você atribuiu o ticket ${ticketId} a si mesmo!`);

        setTickets((prev) =>
          prev.map((t) =>
            t._id === ticketId ? { ...t, assignedTo: user } : t
          )
        );
        setAssigningTicketId(null);
      }, 1000);
    },
    [user]
  );

  const handleLogout = useCallback(() => {
    if (confirm("Tem certeza que deseja sair?")) {
      setUser(null);
      setTickets([]);
    }
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto font-sans min-h-screen flex flex-col">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bem-vindo, {user.name}!</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline focus:outline-none focus:ring-1 focus:ring-red-600 rounded"
          title="Logout"
          aria-label="Sair do sistema"
        >
          Sair
        </button>
      </header>

      <section className="mb-8">
        <a
          href="/tickets/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          aria-label="Abrir Novo Ticket"
        >
          Abrir Novo Ticket
        </a>
      </section>

      <section className="flex-grow">
        <h2 className="text-2xl font-semibold mb-4">Seus Tickets</h2>
        {tickets.length === 0 ? (
          <p>Nenhum ticket encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket._id}
                ticket={ticket}
                currentUser={user}
                onAssign={handleAssignToMe}
                isAssigning={assigningTicketId === ticket._id}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
