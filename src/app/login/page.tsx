"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, useRef } from "react";

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  );
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/tickets/novo";
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  // Focar no input email quando o componente montar
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (result?.error) {
        setErrorMsg("Email ou senha inválidos.");
        setLoading(false);
        emailRef.current?.focus();
        return;
      }

      // Buscar dados do usuário autenticado
      const userResponse = await fetch("/api/auth/session");
      const userData = await userResponse.json();
      const role = userData?.user?.role;

      // Redirecionar conforme o papel
      if (role === "TECHNICIAN") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/tickets/novo";
      }

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Ocorreu um erro inesperado.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-blue-50 to-white px-4">
      <div
        className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg ring-1 ring-gray-200 animate-fadeIn"
        role="main"
      >
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Entrar na sua conta
        </h2>

        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmit}
          noValidate
          aria-describedby={errorMsg ? "error-message" : undefined}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Endereço de email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                ref={emailRef}
                aria-invalid={!!errorMsg}
                className="relative block w-full rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                placeholder="Endereço de email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loading}
                aria-invalid={!!errorMsg}
                className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                placeholder="Senha"
              />
            </div>
          </div>

          <p
            id="error-message"
            role="alert"
            aria-live="assertive"
            className="text-center text-sm text-red-600 min-h-[1.25rem]"
          >
            {errorMsg}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
