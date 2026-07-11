"use client";

import { useState } from "react";
import { MapPin, Clock, Wallet, FileText, Plus, Pencil } from "lucide-react";
import { ACTIVITY_EMOJIS, DURATION_OPTIONS } from "@/lib/activity-options";
import { formatCurrencyBRL } from "@/lib/format";
import type { NewActivityFormData, RoadmapActivity } from "@/types/trip";
import { useCreateActivity, useUpdateActivity } from "@/hooks/roadmap/use-roadmap";
import { toUpperEnum } from "@/lib/utils";
import { CostType } from "@/core/domain/roadmap/roadmap.types";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NewActivityModalProps {
    tripId: string;
    defaultDate?: string;
    editingActivity?: RoadmapActivity | null;
    onClose: () => void;
}

const COST_TYPE_OPTIONS = [
    { value: "free", label: "Gratuito" },
    { value: "total", label: "Total do grupo" },
    { value: "per_person", label: "Por pessoa" },
];

const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const inputSmClass =
    "w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";
const labelSmClass = "mb-1 block text-xs text-neutral-500 dark:text-neutral-400";

function getTodayISO() {
    return new Date().toISOString().split("T")[0];
}

export function NewActivityModal({
    tripId,
    defaultDate,
    editingActivity,
    onClose,
}: NewActivityModalProps) {
    const isEditing = !!editingActivity;

    const [form, setForm] = useState<NewActivityFormData>({
        emoji: editingActivity?.emoji ?? "🎯",
        title: editingActivity?.title ?? "",
        date: editingActivity?.date ?? defaultDate ?? getTodayISO(),
        startTime: editingActivity?.startTime ?? editingActivity?.time ?? "",
        duration: editingActivity?.duration || "1h",
        location: editingActivity?.location ?? "",
        costAmount:
            editingActivity?.costAmount != null
                ? String(editingActivity.costAmount)
                : "",
        costType:
            (editingActivity?.costType?.toLowerCase() as NewActivityFormData["costType"]) ??
            "free",
        note: editingActivity?.note ?? "",
    });
    const createActivity = useCreateActivity(tripId);
    const updateActivity = useUpdateActivity(tripId);
    const isPending = createActivity.isPending || updateActivity.isPending;

    function update(updates: Partial<NewActivityFormData>) {
        setForm((prev) => ({ ...prev, ...updates }));
    }

    const isValid = form.title.trim() !== "" && form.startTime !== "";

    const costPreview =
        form.costType === "free"
            ? "Gratuito"
            : form.costAmount
                ? `${formatCurrencyBRL(Number(form.costAmount))}${form.costType === "per_person" ? "/pessoa" : " total"}`
                : null;

    function handleSubmit() {
        if (!isValid) return;
        const payload = {
            emoji: form.emoji,
            title: form.title,
            date: form.date,
            startTime: form.startTime,
            duration: form.duration || undefined,
            location: form.location || undefined,
            costAmount: form.costType !== "free" && form.costAmount
                ? Number(form.costAmount)
                : undefined,
            costType: toUpperEnum<CostType>(form.costType),
            note: form.note || undefined,
        };

        if (isEditing && editingActivity) {
            updateActivity.mutate(
                { activityId: editingActivity.id, payload },
                { onSuccess: () => onClose() },
            );
        } else {
            createActivity.mutate(payload, { onSuccess: () => onClose() });
        }
    }

    return (
        <Dialog
            open
            onClose={onClose}
            ariaLabel={isEditing ? "Editar atividade" : "Adicionar nova atividade"}
            size="md"
            mobileSheet
        >
            <DialogHeader
                title={isEditing ? "Editar atividade" : "Nova atividade"}
                icon={isEditing ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                onClose={onClose}
            />

            <DialogBody className="space-y-5">
                {/* Seletor de emoji */}
                <div>
                    <p className={labelClass}>Ícone da atividade</p>
                    <div className="grid grid-cols-8 gap-1.5">
                        {ACTIVITY_EMOJIS.map((item) => (
                            <button
                                key={item.emoji}
                                type="button"
                                title={item.label}
                                onClick={() => update({ emoji: item.emoji })}
                                className={`flex h-9 w-full items-center justify-center rounded-lg border text-lg transition-colors ${form.emoji === item.emoji
                                    ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950"
                                    : "border-neutral-100 bg-neutral-50 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                                    }`}
                            >
                                {item.emoji}
                            </button>
                        ))}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-2xl">{form.emoji}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {ACTIVITY_EMOJIS.find((e) => e.emoji === form.emoji)?.label ?? "Outro"}
                        </span>
                    </div>
                </div>

                {/* Título */}
                <div>
                    <label className={labelClass}>
                        Título da atividade <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => update({ title: e.target.value })}
                        placeholder="Ex: Almoço no Restaurante Náutico"
                        className={inputClass}
                    />
                </div>

                {/* Data + Horário + Duração */}
                <div>
                    <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        <Clock className="h-3.5 w-3.5" />
                        Quando
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div>
                            <label className={labelSmClass}>
                                Data <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => update({ date: e.target.value })}
                                className={inputSmClass}
                            />
                        </div>
                        <div>
                            <label className={labelSmClass}>
                                Horário de início <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="time"
                                value={form.startTime}
                                onChange={(e) => update({ startTime: e.target.value })}
                                className={inputSmClass}
                            />
                        </div>
                        <div>
                            <label className={labelSmClass}>Duração</label>
                            <select
                                value={form.duration}
                                onChange={(e) => update({ duration: e.target.value })}
                                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                            >
                                {DURATION_OPTIONS.map((d) => (
                                    <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Localização */}
                <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        <MapPin className="h-3.5 w-3.5" />
                        Localização (opcional)
                    </label>
                    <input
                        type="text"
                        value={form.location}
                        onChange={(e) => update({ location: e.target.value })}
                        placeholder="Ex: Centro, Florianópolis"
                        className={inputClass}
                    />
                </div>

                {/* Custo */}
                <div>
                    <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        <Wallet className="h-3.5 w-3.5" />
                        Custo (opcional)
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className={labelSmClass}>Tipo</label>
                            <div className="flex gap-1.5">
                                {COST_TYPE_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => update({
                                            costType: opt.value as NewActivityFormData["costType"],
                                            costAmount: opt.value === "free" ? "" : form.costAmount,
                                        })}
                                        className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${form.costType === opt.value
                                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-300"
                                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className={labelSmClass}>Valor (R$)</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                value={form.costAmount}
                                onChange={(e) => update({ costAmount: e.target.value })}
                                disabled={form.costType === "free"}
                                placeholder={form.costType === "free" ? "—" : "0,00"}
                                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-500"
                            />
                        </div>
                    </div>

                    {costPreview && (
                        <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                            Será exibido como:{" "}
                            <span className="font-medium text-neutral-600 dark:text-neutral-300">
                                {costPreview}
                            </span>
                        </p>
                    )}
                </div>

                {/* Nota */}
                <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        <FileText className="h-3.5 w-3.5" />
                        Observações (opcional)
                    </label>
                    <textarea
                        value={form.note}
                        onChange={(e) => update({ note: e.target.value })}
                        rows={2}
                        placeholder="Ex: Levar protetor solar, reserva confirmada..."
                        className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                    />
                </div>
            </DialogBody>

            <DialogFooter>
                {!isValid && (
                    <p className="mr-auto text-xs text-neutral-500 dark:text-neutral-400">
                        Título e horário são obrigatórios
                    </p>
                )}
                <Button variant="secondary" onClick={onClose} disabled={isPending}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={!isValid} isLoading={isPending}>
                    {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : "Salvar atividade"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
