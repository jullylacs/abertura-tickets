'use client';

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaCheckCircle, FaClock, FaTimesCircle, FaArrowCircleRight } from "react-icons/fa";

export default function DashboardPage() {
  const { data: session } = useSession();
  const isTechnician = session?.user?.role === 'TECHNICIAN';

  // Exemplo de status com ícones e cores
  const statusBadge = (status: string) => {
    const baseClass = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ";
    switch (status.toLowerCase()) {
      case "open":
        return <span className={baseClass + "bg-red-100 text-red-700"}><FaTimesCircle /> Open</span>;
      case "in progress":
        return <span className={baseClass + "bg-yellow-100 text-yellow-700"}><FaClock /> In Progress</span>;
      case "resolved":
        return <span className={baseClass + "bg-green-100 text-green-700"}><FaCheckCircle /> Resolved</span>;
      default:
        return <span className={baseClass + "bg-gray-100 text-gray-700"}>{status}</span>;
    }
  };

  // Exemplo de prioridade com cores
  const priorityBadge = (priority: string) => {
    const baseClass = "inline-block px-3 py-1 rounded-full text-sm font-medium ";
    switch (priority.toLowerCase()) {
      case "high":
        return <span className={baseClass + "bg-red-600 text-white"}>High</span>;
      case "medium":
        return <span className={baseClass + "bg-yellow-500 text-white"}>Medium</span>;
      case "low":
        return <span className={baseClass + "bg-green-600 text-white"}>Low</span>;
      default:
        return <span className={baseClass + "bg-gray-300 text-gray-800"}>{priority}</span>;
    }
  };

  // Exemplo estático de tickets (você pode substituir por dados reais)
  const tickets = [
    { id: '001', title: 'Login Issue', status: 'Open', priority: 'High', createdBy: 'Alice', createdAt: '2025-10-12' },
    { id: '002', title: 'Page not loading', status: 'In Progress', priority: 'Medium', createdBy: 'Bob', createdAt: '2025-10-11' },
    { id: '003', title: 'Feature Request', status: 'Resolved', priority: 'Low', createdBy: 'Charlie', createdAt: '2025-10-10' },
  ];

  // Contagens para os cards
  const counts = {
    open: tickets.filter(t => t.status.toLowerCase() === 'open').length,
    inProgress: tickets.filter(t => t.status.toLowerCase() === 'in progress').length,
    resolved: tickets.filter(t => t.status.toLowerCase() === 'resolved').length,
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Tickets Dashboard</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg">
          <Link href="/tickets/new" className="flex items-center gap-2">
            Create New Ticket <FaArrowCircleRight />
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Open Tickets</h2>
          <p className="text-5xl font-extrabold text-red-600">{counts.open}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">In Progress</h2>
          <p className="text-5xl font-extrabold text-yellow-500">{counts.inProgress}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Resolved</h2>
          <p className="text-5xl font-extrabold text-green-600">{counts.resolved}</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Recent Tickets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 font-semibold">ID</th>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Priority</th>
                {isTechnician && <th className="px-5 py-3 font-semibold">Created By</th>}
                <th className="px-5 py-3 font-semibold">Created At</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={isTechnician ? 7 : 6} className="text-center py-6 text-gray-500 italic">
                    No tickets found
                  </td>
                </tr>
              ) : (
                tickets.map(({ id, title, status, priority, createdBy, createdAt }) => (
                  <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-gray-600">{id}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{title}</td>
                    <td className="px-5 py-4">{statusBadge(status)}</td>
                    <td className="px-5 py-4">{priorityBadge(priority)}</td>
                    {isTechnician && <td className="px-5 py-4 text-gray-600">{createdBy}</td>}
                    <td className="px-5 py-4 text-gray-500">{new Date(createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <Link href={`/tickets/${id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
