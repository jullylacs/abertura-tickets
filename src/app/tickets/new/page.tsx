'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewTicketPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ title?: string; description?: string }>({});
  const [previewData, setPreviewData] = useState<{ title: string; description: string; priority: string } | null>(null);

  function validate(title: string, description: string) {
    const errors: { title?: string; description?: string } = {};
    if (title.trim().length < 5) {
      errors.title = "Título deve ter pelo menos 5 caracteres.";
    }
    if (description.trim().length < 10) {
      errors.description = "Descrição deve ter pelo menos 10 caracteres.";
    }
    return errors;
  }

  function handlePreviewWithData(title: string, description: string, priority: string) {
    const errors = validate(title, description);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setPreviewData({ title, description, priority });
    } else {
      setPreviewData(null);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = (formData.get('title') as string) || "";
    const description = (formData.get('description') as string) || "";
    const priority = (formData.get('priority') as string) || "Média";

    const errors = validate(title, description);
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ title, description, priority }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setSuccessMsg("Ticket criado com sucesso!");
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        const data = await response.json();
        setErrorMsg(data?.message || "Falha ao criar ticket.");
      }
    } catch (error) {
      console.error('Erro ao criar ticket:', error);
      setErrorMsg("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
      setPreviewData(null);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
        <h1 className="mb-8 text-3xl font-extrabold text-gray-900">Abrir Novo Ticket</h1>

        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              disabled={loading}
              placeholder="Descreva brevemente o problema"
              className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                validationErrors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {validationErrors.title && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              disabled={loading}
              placeholder="Forneça detalhes sobre o problema"
              className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                validationErrors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              }`}
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Prioridade
            </label>
            <select
              id="priority"
              name="priority"
              disabled={loading}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              defaultValue="Média"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          {errorMsg && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          {successMsg && (
            <p className="text-sm text-green-600">{successMsg}</p>
          )}

          <div className="flex justify-between space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              onClick={() => {
                const form = document.querySelector('form');
                if (!form) return;
                const formData = new FormData(form);
                const title = (formData.get('title') as string) || "";
                const description = (formData.get('description') as string) || "";
                const priority = (formData.get('priority') as string) || "Média";
                handlePreviewWithData(title, description, priority);
              }}
              disabled={loading}
              variant="ghost"
            >
              Preview
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Criar Ticket"
              )}
            </Button>
          </div>
        </form>

        {previewData && (
          <div className="mt-10 rounded-lg border border-blue-600 bg-blue-50 p-6 shadow-inner">
            <h2 className="mb-4 text-xl font-semibold text-blue-900">Pré-visualização do Ticket</h2>
            <p><strong>Título:</strong> {previewData.title}</p>
            <p className="mt-2"><strong>Descrição:</strong></p>
            <p className="whitespace-pre-wrap rounded bg-white p-4 shadow-inner">{previewData.description}</p>
            <p className="mt-2"><strong>Prioridade:</strong> {previewData.priority}</p>
          </div>
        )}
      </div>
    </div>
  );
}
