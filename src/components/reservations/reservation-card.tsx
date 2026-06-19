import Link from "next/link";
import {
    BedDouble, Plane, Car, Ship,
    Pencil, Ticket, CreditCard, FileText,
    AlertTriangle, type LucideIcon,
} from "lucide-react";
import type { ReservationDetail } from "@/types/trip";
import { formatCurrencyBRL } from "@/lib/format";

// Banner: cor de fundo + emoji central por categoria
const BANNER: Record<ReservationDetail["category"], { bg: string; emoji: string }> = {
    hotel: { bg: "bg-emerald-50", emoji: "🏨" },
    flight: { bg: "bg-sky-50", emoji: "✈️" },
    car: { bg: "bg-amber-50", emoji: "🚗" },
    tour: { bg: "bg-lime-50", emoji: "⛵" },
};

// Ícone do detalhe por categoria (calendário, pessoas, localização, código)
const DETAIL_ICONS: Record<ReservationDetail["category"], string[]> = {
    hotel: ["📅", "👥", "📍", "🏷️"],
    flight: ["✈️", "↩️", "👥", "🏷️"],
    car: ["📅", "🚗", "📍", "🏷️"],
    tour: ["📅", "👥", "📍"],
};

const STATUS_BADGE: Record<ReservationDetail["status"], { label: string; className: string }> = {
    confirmed: { label: "Confirmado", className: "bg-emerald-50 text-emerald-700" },
    pending: { label: "Pendente", className: "bg-amber-50 text-amber-700" },
    cancelled: { label: "Cancelado", className: "bg-rose-50 text-rose-700" },
};

const ACTION_ICON: Record<string, LucideIcon> = {
    voucher: FileText,
    tickets: Ticket,
    pay: CreditCard,
};

interface ReservationCardProps {
    reservation: ReservationDetail;
}

export function ReservationCard({ reservation: res }: ReservationCardProps) {
    const banner = BANNER[res.category];
    const statusBadge = STATUS_BADGE[res.status];
    const detailIcons = DETAIL_ICONS[res.category];
    const ActionIcon = res.primaryAction ? ACTION_ICON[res.primaryAction.icon] : null;

    return (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {/* Banner colorido com emoji centralizado */}
            <div className={`flex h-28 items-center justify-center ${banner.bg}`}>
                <span className="text-5xl">{banner.emoji}</span>
            </div>

            <div className="p-4">
                {/* Título + badge de status */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="font-semibold text-neutral-900">{res.title}</p>
                        <p className="text-xs text-neutral-400">{res.subtitle}</p>
                    </div>
                    <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge.className}`}
                    >
                        {statusBadge.label}
                    </span>
                </div>

                {/* Detalhes com ícones */}
                <ul className="mt-3 space-y-1">
                    {res.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                            <span className="mt-0.5 shrink-0 text-xs">{detailIcons[i] ?? "•"}</span>
                            {detail}
                        </li>
                    ))}
                </ul>

                {/* Aviso de pendência (só quando existe) */}
                {res.warning && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {res.warning}
                    </div>
                )}

                {/* Rodapé: valor + botões */}
                <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-base font-bold text-neutral-900">
                            {formatCurrencyBRL(res.amount)}
                        </p>
                        <p className="text-xs text-neutral-400">{res.amountSublabel}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {res.primaryAction && ActionIcon && (
                            <Link
                                href={res.primaryAction.href}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${res.primaryAction.icon === "pay"
                                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                        : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                                    }`}
                            >
                                <ActionIcon className="h-3.5 w-3.5" />
                                {res.primaryAction.label}
                            </Link>
                        )}
                        <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}