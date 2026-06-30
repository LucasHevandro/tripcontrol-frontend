"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Clock, Wallet, FileText, Calendar, Plus } from "lucide-react";
import { ACTIVITY_EMOJIS, DURATION_OPTIONS } from "@/lib/activity-options";
import { formatCurrencyBRL } from "@/lib/format";
import type { NewActivityFormData } from "@/types/trip";

interface NewActivityModalProps {
    tripId: string;
    defaultDate?: string;
    onClose: () => void;
    onSave?: (data: NewActivityFormData) => void;
}

const COST_TYPE_OPTIONS = [
    { value: "free", label: "Gratuito" },
    { value: "total", label: "Total do grupo" },
    { value: "per_person", label: "Por pessoa" },
];

function getTodayISO() {
    return new Date().toISOString().split("T")[0];
}

export function NewActivityModal({
    tripId,
    defaultDate,
    onClose,
    onSave,
}: NewActivityModalProps) {
    const [form, setForm] = useState<NewActivityFormData>({
        emoji: "🎯",
        title: "",
        date: defaultDate ?? getTodayISO(),
        startTime: "",
        duration: "1h",
        location: "",
        costAmount: "",
        costType: "free",
        note: "",
    });

    function update(updates: Partial<NewActivityFormData>) {
        setForm((prev) => ({ ...prev, ...updates }));
    }

    // Esc fecha o modal
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
        return () => { document.body.style.overflow = ""; };
    }, []);

    const isValid = form.title.trim() !== "" && form.startTime !== "";

    const costPreview =
        form.costType === "free"
            ? "Gratuito"
            : form.costAmount
                ? `${formatCurrencyBRL(Number(form.costAmount))}${form.costType === "per_person" ? "/pessoa" : " total"}`
                : null;

    function handleSubmit() {
        if (!isValid) return;
        // TODO: POST /trips/:tripId/roadmap { ...form }
        console.log("Salvar atividade:", form);
        onSave?.(form);
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-2 py-4 sm:px-4 sm:py-10"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Adicionar nova atividade"
                className="w-full max-w-[520px] rounded-xl bg-white shadow-xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4 sm:px-5">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                        <Plus className="h-4 w-4" />
                        Nova atividade
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

                {/* Conteúdo */}
                <div className="space-y-5 px-4 py-5 sm:px-5">

                    {/* Seletor de emoji */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-neutral-700">
                            Ícone da atividade
                        </p>
                        <div className="grid grid-cols-8 gap-1.5">
                            {ACTIVITY_EMOJIS.map((item) => (
                                <button
                                    key={item.emoji}
                                    type="button"
                                    title={item.label}
                                    onClick={() => update({ emoji: item.emoji })}
                                    className={`flex h-9 w-full items-center justify-center rounded-lg border text-lg transition-colors ${form.emoji === item.emoji
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-neutral-100 bg-neutral-50 hover:border-neutral-200"
                                        }`}
                                >
                                    {item.emoji}
                                </button>
                            ))}
                        </div>

                        {/* Preview do emoji selecionado */}
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-2xl">{form.emoji}</span>
                            <span className="text-xs text-neutral-400">
                                {ACTIVITY_EMOJIS.find((e) => e.emoji === form.emoji)?.label ?? "Outro"}
                            </span>
                        </div>
                    </div>

                    {/* Título */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Título da atividade <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => update({ title: e.target.value })}
                            placeholder="Ex: Almoço no Restaurante Náutico"
                            className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    {/* Data + Horário + Duração */}
                    <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                            <Clock className="h-3.5 w-3.5" />
                            Quando
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-xs text-neutral-500">
                                    Data <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => update({ date: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-neutral-500">
                                    Horário de início <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={form.startTime}
                                    onChange={(e) => update({ startTime: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-neutral-500">
                                    Duração
                                </label>
                                <select
                                    value={form.duration}
                                    onChange={(e) => update({ duration: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                            <MapPin className="h-3.5 w-3.5" />
                            Localização (opcional)
                        </label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => update({ location: e.target.value })}
                            placeholder="Ex: Centro, Florianópolis"
                            className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    {/* Custo */}
                    <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                            <Wallet className="h-3.5 w-3.5" />
                            Custo (opcional)
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-xs text-neutral-500">Tipo</label>
                                <div className="flex gap-1.5">
                                    {COST_TYPE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                update({
                                                    costType: opt.value as NewActivityFormData["costType"],
                                                    costAmount: opt.value === "free" ? "" : form.costAmount,
                                                });
                                            }}
                                            className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${form.costType === opt.value
                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs text-neutral-500">
                                    Valor (R$)
                                </label>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    min="0"
                                    step="0.01"
                                    value={form.costAmount}
                                    onChange={(e) => update({ costAmount: e.target.value })}
                                    disabled={form.costType === "free"}
                                    placeholder={form.costType === "free" ? "—" : "0,00"}
                                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                        </div>

                        {/* Preview do custo */}
                        {costPreview && (
                            <p className="mt-2 text-xs text-neutral-400">
                                Será exibido como:{" "}
                                <span className="font-medium text-neutral-600">{costPreview}</span>
                            </p>
                        )}
                    </div>

                    {/* Nota */}
                    <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                            <FileText className="h-3.5 w-3.5" />
                            Observações (opcional)
                        </label>
                        <textarea
                            value={form.note}
                            onChange={(e) => update({ note: e.target.value })}
                            rows={2}
                            placeholder="Ex: Levar protetor solar, reserva confirmada..."
                            className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-4 py-4 sm:px-5">
                    {!isValid && (
                        <p className="mr-auto text-xs text-neutral-400">
                            Título e horário são obrigatórios
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Calendar className="h-4 w-4" />
                        Salvar atividade
                    </button>
                </div>
            </div>
        </div>
    );
}