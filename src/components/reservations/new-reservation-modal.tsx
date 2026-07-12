"use client";

import { useState } from "react";
import { Plus, AlertCircle, Pencil } from "lucide-react";
import { RESERVATION_CATEGORIES } from "@/lib/reservation-options";
import { ReservationCategoryFields } from "./reservation-category-fields";
import { formatCurrencyBRL } from "@/lib/format";
import type { NewReservationFormData, ReservationCategory, ReservationDetail } from "@/types/trip";
import { useCreateReservation, useUpdateReservation } from "@/hooks/reservations/use-reservations";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import {
    buildReservationPayload,
    EMPTY_RESERVATION_FORM,
    isReservationFormValid,
} from "./reservation-form";

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
}

const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

export function NewReservationModal({
    tripId,
    participants,
    currentUserId,
    editingReservation,
    onClose,
}: NewReservationModalProps) {
    const isEditing = !!editingReservation;

    const [form, setForm] = useState<NewReservationFormData>(() => {
        if (editingReservation) {
            const cat = editingReservation.category;
            const raw = editingReservation.rawDetails ?? {};
            return {
                ...EMPTY_RESERVATION_FORM,
                category: cat,
                title: editingReservation.title,
                subtitle: editingReservation.subtitle,
                amount: String(editingReservation.amount),
                paidById: editingReservation.paidById ?? currentUserId,
                notes: editingReservation.notes ?? "",
                // Preenche apenas o bloco da categoria da reserva editada
                [cat]: { ...EMPTY_RESERVATION_FORM[cat], ...raw },
            } as NewReservationFormData;
        }
        return { ...EMPTY_RESERVATION_FORM, paidById: currentUserId };
    });

    const createReservation = useCreateReservation(tripId);
    const updateReservation = useUpdateReservation(tripId);
    const isPending = createReservation.isPending || updateReservation.isPending;

    function update(updates: Partial<NewReservationFormData>) {
        setForm((prev) => ({ ...prev, ...updates }));
    }

    function handleCategoryChange(category: ReservationCategory) {
        const found = RESERVATION_CATEGORIES.find((c) => c.value === category);
        update({ category, subtitle: found?.label ?? "" });
    }

    const isValid = isReservationFormValid(form);

    function handleSubmit() {
        if (!isValid) return;
        const payload = buildReservationPayload(form);

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
        <Dialog
            open
            onClose={onClose}
            ariaLabel={isEditing ? "Editar reserva" : "Adicionar nova reserva"}
            size="lg"
            mobileSheet
        >
            <DialogHeader
                title={isEditing ? "Editar reserva" : "Nova reserva"}
                icon={isEditing ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                onClose={onClose}
            />

            <DialogBody className="space-y-6">
                {/* Tipo de reserva */}
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
                                        : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
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

                {/* Identificação */}
                <div>
                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Identificação
                    </h3>
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
                </div>

                {/* Detalhes (dinâmico por categoria) */}
                {form.category && (
                    <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                        <h3 className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {selectedCategory?.icon && <selectedCategory.icon className="h-3.5 w-3.5" />}
                            Detalhes da {selectedCategory?.label}
                        </h3>
                        <ReservationCategoryFields
                            category={form.category}
                            form={form}
                            update={update}
                        />
                    </div>
                )}

                {/* Pagamento */}
                <div>
                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Pagamento
                    </h3>
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
                                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
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
                </div>

                {/* Observações */}
                <div>
                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Observações
                    </h3>
                    <textarea
                        value={form.notes}
                        onChange={(e) => update({ notes: e.target.value })}
                        rows={2}
                        placeholder="Informações adicionais sobre a reserva..."
                        className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                    />
                </div>
            </DialogBody>

            <DialogFooter>
                {!isValid && (
                    <p className="mr-auto flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {!form.category
                            ? "Selecione o tipo de reserva"
                            : !form.title.trim()
                                ? "Preencha o nome da reserva"
                                : "Informe o valor total"}
                    </p>
                )}
                <Button variant="secondary" onClick={onClose} disabled={isPending}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={!isValid} isLoading={isPending}>
                    {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : "Salvar reserva"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
