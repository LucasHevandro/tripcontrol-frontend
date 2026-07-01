"use client";

import { useState, useEffect } from "react";
import {
    X,
    Link as LinkIcon,
    Copy,
    Check,
    Mail,
    Send,
    Plus,
    Trash2,
    Users,
} from "lucide-react";
import { useToast } from "@/contexts/toast-context";
import { useInviteByEmail } from "@/hooks/participants/use-participants";

interface InviteModalProps {
    tripId: string;
    tripName: string;
    inviteLink: string;
    onClose: () => void;
}

interface EmailEntry {
    id: string;
    value: string;
    error: string | null;
    sent: boolean;
}

function generateId() {
    return Math.random().toString(36).slice(2, 9);
}

function validateEmail(email: string): string | null {
    if (!email.trim()) return "Preencha o e-mail";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido";
    return null;
}

export function InviteModal({
    tripId,
    tripName,
    inviteLink,
    onClose,
}: InviteModalProps) {
    const [copied, setCopied] = useState(false);
    const [emails, setEmails] = useState<EmailEntry[]>([
        { id: generateId(), value: "", error: null, sent: false },
    ]);
    const [isSending, setIsSending] = useState(false);
    const [allSent, setAllSent] = useState(false);
    const { addToast } = useToast();
    const inviteByEmail = useInviteByEmail(tripId);

    // Fecha com Esc
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Bloqueia scroll do body
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    function handleCopyLink() {
        navigator.clipboard.writeText(inviteLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    }

    function updateEmail(id: string, value: string) {
        setEmails((prev) =>
            prev.map((e) =>
                e.id === id ? { ...e, value, error: null, sent: false } : e
            )
        );
    }

    function addEmailField() {
        setEmails((prev) => [
            ...prev,
            { id: generateId(), value: "", error: null, sent: false },
        ]);
    }

    function removeEmailField(id: string) {
        setEmails((prev) => {
            if (prev.length === 1) return prev;
            return prev.filter((e) => e.id !== id);
        });
    }

    async function handleSendInvites() {
        const validated = emails.map((e) => ({
            ...e,
            error: validateEmail(e.value),
        }));
        setEmails(validated);
        if (validated.some((e) => e.error !== null)) return;

        inviteByEmail.mutate(
            emails.map((e) => e.value),
            {
                onSuccess: () => {
                    setEmails((prev) => prev.map((e) => ({ ...e, sent: true })));
                    setAllSent(true);
                },
            },
        );
    }

    const hasAnyEmail = emails.some((e) => e.value.trim() !== "");

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-2 py-4 sm:px-4 sm:py-10"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Convidar participante"
                className="w-full max-w-[500px] rounded-xl bg-white shadow-xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4 sm:px-5">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                        <Users className="h-4 w-4" />
                        Convidar participante
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                        aria-label="Fechar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-5 px-4 py-5 sm:px-5">
                    {/* Contexto da viagem */}
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5">
                        <span className="text-base">✈️</span>
                        <div>
                            <p className="text-sm font-medium text-emerald-900">{tripName}</p>
                            <p className="text-xs text-emerald-700">
                                Qualquer pessoa convidada poderá ver e editar a viagem
                            </p>
                        </div>
                    </div>

                    {/* Seção 1 — Via link */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
                                1
                            </div>
                            <p className="text-sm font-medium text-neutral-900">
                                Compartilhe o link de convite
                            </p>
                        </div>

                        <p className="mb-3 text-xs text-neutral-400">
                            Qualquer pessoa com este link pode entrar na viagem. Você pode
                            revogar o acesso a qualquer momento.
                        </p>

                        <div className="flex items-center gap-2">
                            <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                                <LinkIcon className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                                <p className="truncate text-xs text-neutral-500">{inviteLink}</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${copied
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        Copiar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Divisor */}
                    <div className="relative flex items-center gap-3">
                        <div className="h-px flex-1 bg-neutral-200" />
                        <span className="text-xs text-neutral-400">ou convide por e-mail</span>
                        <div className="h-px flex-1 bg-neutral-200" />
                    </div>

                    {/* Seção 2 — Via e-mail */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
                                2
                            </div>
                            <p className="text-sm font-medium text-neutral-900">
                                Enviar convite por e-mail
                            </p>
                        </div>

                        {allSent ? (
                            <div className="flex flex-col items-center gap-2 rounded-lg bg-emerald-50 py-6 text-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                                    <Check className="h-5 w-5 text-white" />
                                </div>
                                <p className="text-sm font-medium text-emerald-800">
                                    Convites enviados com sucesso!
                                </p>
                                <p className="text-xs text-emerald-600">
                                    Os participantes receberão um e-mail com o link para entrar na
                                    viagem.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmails([
                                            { id: generateId(), value: "", error: null, sent: false },
                                        ]);
                                        setAllSent(false);
                                    }}
                                    className="mt-1 text-xs font-medium text-emerald-700 underline hover:text-emerald-800"
                                >
                                    Convidar mais pessoas
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {emails.map((entry, index) => (
                                    <div key={entry.id}>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
                                                <input
                                                    type="email"
                                                    value={entry.value}
                                                    onChange={(e) =>
                                                        updateEmail(entry.id, e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addEmailField();
                                                        }
                                                    }}
                                                    placeholder="email@exemplo.com"
                                                    className={`w-full rounded-lg border py-2.5 pl-9 pr-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 ${entry.error
                                                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                                                        : "border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                        }`}
                                                />
                                            </div>
                                            {emails.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeEmailField(entry.id)}
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-rose-50 hover:text-rose-500"
                                                    aria-label="Remover e-mail"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                        {entry.error && (
                                            <p className="mt-1 text-xs text-rose-600">{entry.error}</p>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addEmailField}
                                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-700"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Adicionar outro e-mail
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                {!allSent && (
                    <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-4 py-4 sm:px-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                            Fechar
                        </button>
                        <button
                            type="button"
                            onClick={handleSendInvites}
                            disabled={!hasAnyEmail || inviteByEmail.isPending}
                            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {inviteByEmail.isPending ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Enviar convites
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}