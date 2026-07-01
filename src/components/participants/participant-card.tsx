"use client";

import { BarChart2, MessageCircle, HandCoins } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL, formatBalance } from "@/lib/format";
import type { ParticipantDetail } from "@/types/trip";

interface ParticipantCardProps {
    participant: ParticipantDetail;
    tripId: string;
}

export function ParticipantCard({ participant: p, tripId }: ParticipantCardProps) {
    const color = getAvatarColor(p.id);
    const isOrganizer = p.role === 'ORGANIZER';
    const isPositive = p.balance >= 0;

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${color.bg} ${color.text}`}
                    >
                        {getInitials(p.name)}
                    </span>
                    <div>
                        <p className="font-medium text-neutral-900">{p.name}</p>
                        <p className="text-xs text-neutral-400">{p.email}</p>
                    </div>
                </div>
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${isOrganizer
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-500"
                        }`}
                >
                    {isOrganizer ? "Organizador" : "Membro"}
                </span>
            </div>

            {/* 3 métricas internas */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-neutral-50 p-3 text-center">
                    <p className="text-base font-bold text-neutral-900">
                        {formatCurrencyBRL(p.totalPaid)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">total pago</p>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center">
                    <p className="text-base font-bold text-neutral-900">
                        {formatCurrencyBRL(p.individualQuota)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">cota individual</p>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3 text-center">
                    <p
                        className={`text-base font-bold ${isPositive ? "text-emerald-600" : "text-rose-600"
                            }`}
                    >
                        {formatBalance(p.balance)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">saldo</p>
                </div>
            </div>

            {/* Botões de ação */}
            <div className="mt-3 flex gap-2">
                <button
                    type="button"
                    onClick={() => {
                        // TODO: abrir modal/link de despesas do participante
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                    <BarChart2 className="h-3.5 w-3.5" />
                    Ver despesas
                </button>

                {!isOrganizer && p.balance < 0 ? (
                    <button
                        type="button"
                        onClick={() => {
                            // TODO: enviar notificação de acerto para o participante
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                    >
                        <HandCoins className="h-3.5 w-3.5" />
                        Solicitar acerto
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            // TODO: abrir modal de mensagem
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Enviar mensagem
                    </button>
                )}
            </div>
        </div>
    );
}