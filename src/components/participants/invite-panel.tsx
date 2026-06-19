"use client";

import { useState } from "react";
import { Copy, Check, Mail, Send } from "lucide-react";

interface InvitePanelProps {
    inviteLink: string;
}

export function InvitePanel({ inviteLink }: InvitePanelProps) {
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState("");

    function handleCopy() {
        navigator.clipboard.writeText(inviteLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    function handleSendInvite(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: POST /trips/:tripId/invites { email }
        setEmail("");
    }

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                🔗 Convidar via link
            </h2>

            <div className="mt-3 rounded-lg border border-dashed border-neutral-200 p-4 text-center">
                <Mail className="mx-auto h-6 w-6 text-neutral-300" />
                <p className="mt-2 text-sm font-medium text-neutral-700">
                    Compartilhe o link de convite
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                    Qualquer pessoa com o link pode entrar na viagem
                </p>
            </div>

            <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
                    <p className="truncate text-xs text-neutral-500">{inviteLink}</p>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${copied
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5" />
                            Copiado
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            Copiar
                        </>
                    )}
                </button>
            </div>

            <p className="mt-4 text-xs font-medium text-neutral-600">
                Ou convide por e-mail
            </p>
            <form onSubmit={handleSendInvite} className="mt-2 flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Send className="h-3.5 w-3.5" />
                    Enviar
                </button>
            </form>
        </div>
    );
}