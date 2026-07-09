"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Pencil, Trash2, Ticket, CreditCard, FileText, AlertTriangle,
    Calendar, Users, MapPin, Tag, RotateCcw, Car,
    type LucideIcon,
    Plane,
} from "lucide-react";
import type { ReservationDetail } from "@/types/trip";
import { formatCurrencyBRL } from "@/lib/format";
import { useDeleteReservation } from "@/hooks/reservations/use-reservations";
import { useParticipants } from "@/hooks/participants/use-participants";
import { useUser } from "@/contexts/user-context";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { RESERVATION_CATEGORIES } from "@/lib/reservation-options";
import { NewReservationModal } from "./new-reservation-modal";

const CATEGORY_BY_VALUE = new Map(RESERVATION_CATEGORIES.map((c) => [c.value, c]));

const DETAIL_ICONS: Record<ReservationDetail["category"], LucideIcon[]> = {
    hotel: [Calendar, Users, MapPin, Tag],
    flight: [Plane, RotateCcw, Users, Tag],
    car: [Calendar, Car, MapPin, Tag],
    tour: [Calendar, Users, MapPin],
};

const STATUS_BADGE: Record<ReservationDetail["status"], { label: string; className: string }> = {
    confirmed: { label: "Confirmado", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
    pending: { label: "Pendente", className: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" },
    cancelled: { label: "Cancelado", className: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400" },
};

const ACTION_ICON: Record<string, LucideIcon> = {
    voucher: FileText,
    tickets: Ticket,
    pay: CreditCard,
};

interface ReservationCardProps {
    tripId: string;
    reservation: ReservationDetail;
}

export function ReservationCard({ tripId, reservation: res }: ReservationCardProps) {
    const deleteReservation = useDeleteReservation(tripId);
    const { data: participantsData } = useParticipants(tripId);
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const participants = (participantsData?.participants ?? []).map((p) => ({
        id: p.id,
        name: p.name,
    }));

    function handleDelete() {
        deleteReservation.mutate(res.id, {
            onSuccess: () => setConfirmDelete(false),
        });
    }

    const category = CATEGORY_BY_VALUE.get(res.category);
    const statusBadge = STATUS_BADGE[res.status];
    const detailIcons = DETAIL_ICONS[res.category];
    const ActionIcon = res.primaryAction ? ACTION_ICON[res.primaryAction.icon] : null;

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                <div className={`relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br ${category?.gradient ?? "from-neutral-500 to-neutral-700"}`}>
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-6 -left-4 h-20 w-20 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                    {category?.icon && <category.icon className="relative h-10 w-10 text-white drop-shadow-md" aria-hidden="true" />}
                </div>

                <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="font-semibold text-neutral-900 dark:text-neutral-100">{res.title}</p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">{res.subtitle}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge.className}`}>
                            {statusBadge.label}
                        </span>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                        {res.details.map((detail, i) => {
                            const Icon = DETAIL_ICONS[res.category]?.[i];
                            return (
                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    {Icon ? (
                                        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
                                    ) : (
                                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden="true" />
                                    )}
                                    {detail}
                                </li>
                            );
                        })}
                    </ul>

                    {res.warning && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {res.warning}
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                                {formatCurrencyBRL(res.amount)}
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">{res.amountSublabel}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            {res.primaryAction && ActionIcon && (
                                <Link
                                    href={res.primaryAction.href}
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${res.primaryAction.icon === "pay"
                                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                        : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                        }`}
                                >
                                    <ActionIcon className="h-3.5 w-3.5" />
                                    {res.primaryAction.label}
                                </Link>
                            )}
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(true)}
                                aria-label={`Excluir reserva ${res.title}`}
                                className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 dark:border-neutral-700 dark:hover:border-rose-800 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <NewReservationModal
                    tripId={tripId}
                    participants={participants}
                    currentUserId={user?.id ?? ""}
                    editingReservation={res}
                    onClose={() => setIsEditing(false)}
                />
            )}

            <ConfirmDialog
                open={confirmDelete}
                title="Excluir reserva"
                message={`Tem certeza que deseja excluir "${res.title}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Excluir"
                variant="danger"
                isLoading={deleteReservation.isPending}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
            />
        </>
    );
}