"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950">
                <AlertTriangle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Algo deu errado</h1>
            <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
                Ocorreu um erro inesperado. Tente novamente ou volte para suas viagens.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={reset}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    Tentar novamente
                </button>
                <Link
                    href="/trips"
                    className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    Voltar para viagens
                </Link>
            </div>
            {process.env.NODE_ENV === "development" && (
                <p className="mt-6 max-w-sm font-mono text-xs text-neutral-400 dark:text-neutral-500">
                    {error.message}
                </p>
            )}
        </div>
    );
}