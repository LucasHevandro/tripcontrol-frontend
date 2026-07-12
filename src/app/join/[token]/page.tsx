"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Check, AlertTriangle, LogIn } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { useJoinTrip } from "@/hooks/participants/use-participants";
import { getErrorMessage } from "@/lib/utils";
import { getInviteLoginHref } from "@/lib/auth-routing";

type Status = "checking" | "unauthenticated" | "joining" | "success" | "error";

export default function JoinPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = use(params);
    const router = useRouter();
    const { user, isLoading: authLoading } = useUser();
    const joinTrip = useJoinTrip();

    const [status, setStatus] = useState<Status>("checking");
    const [tripName, setTripName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const hasAttempted = useRef(false);

    useEffect(() => {
        // Aguarda a verificação de autenticação terminar
        if (authLoading) return;

        // Não logado → guarda o destino e manda pro login
        if (!user) {
            setStatus("unauthenticated");
            return;
        }

        // Evita chamar o join mais de uma vez (StrictMode / re-render)
        if (hasAttempted.current) return;
        hasAttempted.current = true;

        setStatus("joining");
        joinTrip.mutate(token, {
            onSuccess: (result) => {
                setTripName(result.tripName);
                setStatus("success");
                // Redireciona automaticamente após um breve intervalo
                setTimeout(() => {
                    router.push(`/trips/${result.tripId}/dashboard`);
                }, 1800);
            },
            onError: (error) => {
                setErrorMessage(
                    getErrorMessage(error, "Não foi possível entrar na viagem"),
                );
                setStatus("error");
            },
        });
    }, [authLoading, user, token, joinTrip, router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <Link href="/trips" className="mb-10 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
                <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    TripControl
                </span>
            </Link>

            <div className="w-full max-w-[400px] rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
                {(status === "checking" || status === "joining") && (
                    <div className="flex flex-col items-center gap-4">
                        <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-emerald-600 border-t-transparent" />
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                {status === "checking"
                                    ? "Verificando convite..."
                                    : "Entrando na viagem..."}
                            </p>
                            <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
                                Só um instante
                            </p>
                        </div>
                    </div>
                )}

                {status === "unauthenticated" && (
                    <div className="flex flex-col items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                            <LogIn className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                Você foi convidado!
                            </h1>
                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                Entre na sua conta ou cadastre-se para participar da viagem.
                            </p>
                        </div>
                        <Link
                            href={getInviteLoginHref(token)}
                            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            Entrar para continuar
                        </Link>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                            <Check className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                Tudo certo!
                            </h1>
                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                Você entrou em <strong>{tripName}</strong>. Redirecionando...
                            </p>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                            <AlertTriangle className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                Não foi possível entrar
                            </h1>
                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                {errorMessage}
                            </p>
                        </div>
                        <Link
                            href="/trips"
                            className="w-full rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            Ir para Minhas viagens
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
