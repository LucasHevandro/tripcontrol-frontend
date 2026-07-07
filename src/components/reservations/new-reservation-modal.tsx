"use client";

import { useState, useEffect } from "react";
import { X, Plus, AlertCircle, Pencil } from "lucide-react";
import { RESERVATION_CATEGORIES } from "@/lib/reservation-options";
import { ReservationCategoryFields } from "./reservation-category-fields";
import { formatCurrencyBRL } from "@/lib/format";
import type { NewReservationFormData, ReservationCategory, ReservationDetail } from "@/types/trip";
import { useCreateReservation, useUpdateReservation } from "@/hooks/reservations/use-reservations";
import { toUpperEnum } from "@/lib/utils";
import type { ReservationCategoryUpper } from "@/core/domain/reservation/reservation.types";

interface Participant {
    id: string;
    name: string;
}

interface NewReservationModalProps {
    tripId: string;
    participants: Participant[];
    currentUserId: string;
    editingReservation?: ReservationDetail | null;
    onClose: () => void;
    onSave?: (data: NewReservationFormData) => void;
}

const EMPTY_FORM: NewReservationFormData = {
    category: null,
    title: "",
    subtitle: "",
    amount: "",
    paidById: "",
    notes: "",
    hotel: { checkIn: "", checkOut: "", guestCount: "", roomCount: "", address: "", reservationCode: "" },
    flight: { departureDate: "", departureTime: "", arrivalTime: "", flightNumber: "", returnDate: "", returnTime: "", returnFlightNumber: "", passengerCount: "", cabinClass: "economy", locator: "" },
    car: { pickupDate: "", pickupTime: "", returnDate: "", returnTime: "", pickupLocation: "", carModel: "", reservationCode: "" },
    tour: { date: "", startTime: "", endTime: "", peopleCount: "", meetingPoint: "", warning: "" },
};

const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

export function NewReservationModal({
    tripId,
    participants,
    currentUserId,
    editingReservation,
    onClose,
    onSave,
}: NewReservationModalProps) {
    const isEditing = !!editingReservation;

    const [form, setForm] = useState<NewReservationFormData>(() => {
        if (editingReservation) {
            const cat = editingReservation.category;
            const raw = editingReservation.rawDetails ?? {};
            return {
                ...EMPTY_FORM,
                category: cat,
                title: editingReservation.title,
                subtitle: editingReservation.subtitle,
                amount: String(editingReservation.amount),
                paidById: editingReservation.paidById ?? currentUserId,
                notes: editingReservation.notes ?? "",
                // Preenche apenas o bloco da categoria da reserva editada
                [cat]: { ...EMPTY_FORM[cat], ...raw },
            } as NewReservationFormData;
        }
        return { ...EMPTY_FORM, paidById: currentUserId };
    });

    const createReservation = useCreateReservation(tripId);
    const updateReservation = useUpdateReservation(tripId);
    const isPending = createReservation.isPending || updateReservation.isPending;

    function update(updates: Partial<NewReservationFormData>) {
        setForm((prev) => ({ ...prev, ...updates }));
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    function handleCategoryChange(category: ReservationCategory) {
        const found = RESERVATION_CATEGORIES.find((c) => c.value === category);
        update({ category, subtitle: found?.label ?? "" });
    }

    const isValid =
        form.category !== null &&
        form.title.trim() !== "" &&
        Number(form.amount) > 0;

    function handleSubmit() {
        if (!isValid) return;
        const payload = {
            category: toUpperEnum<ReservationCategoryUpper>(form.category!),
            title: form.title,
            subtitle: form.subtitle || undefined,
            amount: Number(form.amount),
            paidById: form.paidById || undefined,
            notes: form.notes || undefined,
            details: form.category ? (form[form.category] as any) : undefined,
        };

        if (isEditing && editingReservation) {
            updateReservation.mutate(
                { reservationId: editingReservation.id, payload },
                { onSuccess: () => onClose() },
            );
        } else {
            createReservation.mutate(payload, { onSuccess: () => onClose() });
        }
    }

    const selectedCategory = RESERVATION_CATEGORIES.find((c) => c.value === form.category);

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-2 py-4 sm:px-4 sm:py-10"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={isEditing ? "Editar reserva" : "Adicionar nova reserva"}
                className="w-full max-w-[560px] rounded-xl bg-white shadow-xl dark:bg-neutral-900"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-5">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        {isEditing ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {isEditing ? "Editar reserva" : "Nova reserva"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                        aria-label="Fechar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-5 px-4 py-5 sm:px-5">

                    {/* Seleção de categoria */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Tipo de reserva <span className="text-rose-500">*</span>
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {RESERVATION_CATEGORIES.map((cat) => {
                                const isSelected = form.category === cat.value;
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => handleCategoryChange(cat.value)}
                                        className={`flex flex-col items-center gap-1.5 rounded-lg border py-3 text-sm transition-colors ${isSelected
                                                ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950"
                                                : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-750"
                                            }`}
                                    >
                                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${cat.bg} ${cat.color}`}>
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <span className={`text-xs font-medium ${isSelected
                                                ? "text-emerald-700 dark:text-emerald-300"
                                                : "text-neutral-600 dark:text-neutral-400"
                                            }`}>
                                            {cat.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nome da reserva */}
                    <div>
                        <label className={labelClass}>
                            Nome da reserva <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => update({ title: e.target.value })}
                            placeholder={
                                form.category === "hotel" ? "Ex: Hotel Beira Mar Inn" :
                                    form.category === "flight" ? "Ex: Azul Linhas Aéreas" :
                                        form.category === "car" ? "Ex: Localiza · Aluguel de carro" :
                                            form.category === "tour" ? "Ex: Passeio de escuna" :
                                                "Nome da reserva"
                            }
                            className={inputClass}
                        />
                    </div>

                    {/* Campos dinâmicos da categoria */}
                    {form.category && (
                        <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                <span>{selectedCategory?.emoji}</span>
                                Detalhes da {selectedCategory?.label}
                            </p>
                            <ReservationCategoryFields
                                category={form.category}
                                form={form}
                                update={update}
                            />
                        </div>
                    )}

                    {/* Valor + Quem pagou */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>
                                Valor total (R$) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                value={form.amount}
                                onChange={(e) => update({ amount: e.target.value })}
                                placeholder="0,00"
                                className={inputClass}
                            />
                            {Number(form.amount) > 0 && (
                                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                                    {formatCurrencyBRL(Number(form.amount))}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className={labelClass}>Pago por</label>
                            <select
                                value={form.paidById}
                                onChange={(e) => update({ paidById: e.target.value })}
                                className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                            >
                                {participants.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                                <option value="individual">Pago individualmente</option>
                            </select>
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label className={labelClass}>Observações (opcional)</label>
                        <textarea
                            value={form.notes}
                            onChange={(e) => update({ notes: e.target.value })}
                            rows={2}
                            placeholder="Informações adicionais sobre a reserva..."
                            className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-5">
                    {!isValid && (
                        <p className="mr-auto flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {!form.category
                                ? "Selecione o tipo de reserva"
                                : !form.title.trim()
                                    ? "Preencha o nome da reserva"
                                    : "Informe o valor total"}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid || isPending}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : "Salvar reserva"}
                    </button>
                </div>
            </div>
        </div>
    );
}