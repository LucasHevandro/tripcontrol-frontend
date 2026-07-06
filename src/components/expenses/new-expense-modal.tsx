"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { X, Plus, Paperclip, Save, AlertCircle } from "lucide-react";
import { getCategoryColor, getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import { EXPENSE_CATEGORIES } from "@/lib/expense-categories";
import type { NewExpenseFormData, ExpenseCategory } from "@/types/trip";
import { useToast } from "@/contexts/toast-context";
import { useCreateExpense } from "@/hooks/expenses/use-expenses";

interface Participant {
    id: string;
    name: string;
}

interface NewExpenseModalProps {
    tripId: string;
    participants: Participant[];
    currentUserId: string;
    onClose: () => void;
    onSave?: (data: NewExpenseFormData) => void;
}

const SPLIT_OPTIONS = [
    { value: "equal", label: "Igualmente entre todos" },
    { value: "custom", label: "Personalizado" },
];

function getTodayISO() {
    return new Date().toISOString().split("T")[0];
}

export function NewExpenseModal({
    tripId,
    participants,
    currentUserId,
    onClose,
    onSave,
}: NewExpenseModalProps) {
    const initialForm = useMemo<NewExpenseFormData>(() => ({
        description: "",
        amount: "",
        date: getTodayISO(),
        category: null,
        paidById: currentUserId || participants[0]?.id || "",
        splitType: "equal",
        splitParticipantIds: participants.map((p) => p.id),
        receiptFile: null,
        notes: "",
    }), [currentUserId, participants]);

    const [form, setForm] = useState<NewExpenseFormData>(initialForm);
    const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToast();
    const createExpense = useCreateExpense(tripId);

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
        return () => { document.body.style.overflow = ""; };
    }, []);

    function update(updates: Partial<NewExpenseFormData>) {
        setForm((prev) => ({ ...prev, ...updates }));
    }

    function toggleParticipant(id: string) {
        // No modo igual, não permite alterar a seleção
        if (form.splitType === "equal") return;

        setForm((prev) => {
            const already = prev.splitParticipantIds.includes(id);
            if (already && prev.splitParticipantIds.length === 1) return prev;
            return {
                ...prev,
                splitParticipantIds: already
                    ? prev.splitParticipantIds.filter((p) => p !== id)
                    : [...prev.splitParticipantIds, id],
            };
        });
    }

    function handleSplitTypeChange(value: string) {
        const newSplitType = value as "equal" | "custom";
        update({
            splitType: newSplitType,
            // Ao voltar pra igual, reseta para todos selecionados
            splitParticipantIds:
                newSplitType === "equal"
                    ? participants.map((p) => p.id)
                    : form.splitParticipantIds,
        });
    }

    function handleFile(file: File) {
        if (!file) return;
        update({ receiptFile: file });
        setReceiptPreview(file.name);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDraggingOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    function handleSubmit() {
        if (!isValid) return;

        const isEqual = form.splitType === "equal";
        const amount = Number(form.amount);
        const selectedIds = form.splitParticipantIds;

        createExpense.mutate(
            {
                description: form.description,
                amount,
                date: form.date,
                category: form.category!,
                paidById: form.paidById,
                // Se é EQUAL ou CUSTOM sem valores individuais → manda EQUAL sem splitParticipants
                // O backend vai dividir igualmente entre todos automaticamente
                splitType: "EQUAL",
                splitParticipants: selectedIds.map((id) => ({ participantId: id })),
                notes: form.notes || undefined,
            },
            { onSuccess: () => onClose() },
        );
    }

    const amountNumber = Number(form.amount) || 0;
    const selectedCount = form.splitParticipantIds.length;
    const perPerson = selectedCount > 0 ? amountNumber / selectedCount : 0;

    const isValid =
        form.description.trim() !== "" &&
        amountNumber > 0 &&
        form.category !== null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-2 py-4 sm:px-4 sm:py-10"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Adicionar nova despesa"
                className="w-full max-w-[560px] rounded-xl bg-white shadow-xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4 sm:px-5">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                        <Plus className="h-4 w-4" />
                        Adicionar nova despesa
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
                    {/* Descrição */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Descrição da despesa
                        </label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => update({ description: e.target.value })}
                            placeholder="Ex: Jantar na Beira Mar"
                            className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    {/* Valor + Data */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Valor (R$)
                            </label>
                            <input
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                value={form.amount}
                                onChange={(e) => update({ amount: e.target.value })}
                                placeholder="0,00"
                                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Data
                            </label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => update({ date: e.target.value })}
                                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>

                    {/* Categoria */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-neutral-700">Categoria</p>
                        <div className="flex flex-wrap gap-2">
                            {EXPENSE_CATEGORIES.map((cat) => {
                                const isSelected = form.category === cat.value;
                                const color = getCategoryColor(cat.value);
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => update({ category: cat.value as ExpenseCategory })}
                                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${isSelected
                                            ? `${color.badge} border-transparent font-medium`
                                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                            }`}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pago por + Divisão */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Pago por
                            </label>
                            <select
                                value={form.paidById}
                                onChange={(e) => update({ paidById: e.target.value })}
                                className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            >
                                {participants.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Divisão
                            </label>
                            <select
                                value={form.splitType}
                                onChange={(e) => handleSplitTypeChange(e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            >
                                {SPLIT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Dividir com */}
                    <div>
                        <p className="mb-2 text-sm font-medium text-neutral-700">Dividir com</p>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {participants.map((p) => {
                                const isSelected = form.splitParticipantIds.includes(p.id);
                                const isEqual = form.splitType === "equal";
                                const color = getAvatarColor(p.id);
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => toggleParticipant(p.id)}
                                        disabled={isEqual} // ← desabilita no modo igual
                                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${isSelected
                                            ? isEqual
                                                ? "border-emerald-200 bg-emerald-50 cursor-default" // ← verde mais suave, sem pointer
                                                : "border-emerald-500 bg-emerald-50"
                                            : "border-neutral-200 bg-white hover:border-neutral-300"
                                            }`}
                                    >
                                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}>
                                            {getInitials(p.name)}
                                        </span>
                                        <span className="min-w-0 flex-1 truncate text-left text-sm text-neutral-900">
                                            {p.name}
                                        </span>
                                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${isSelected
                                            ? "border-emerald-600 bg-emerald-600"
                                            : "border-neutral-300"
                                            }`}>
                                            {isSelected && (
                                                <svg viewBox="0 0 10 8" fill="none" className="h-2.5 w-2.5 text-white">
                                                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Preview valor por pessoa */}
                        {amountNumber > 0 && selectedCount > 0 && (
                            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                                <span>💡</span>
                                <span>
                                    {form.splitType === "equal"
                                        ? `Dividido igualmente: `
                                        : `Valor por pessoa: `}
                                    <strong>{formatCurrencyBRL(perPerson)}</strong>{" "}
                                    ({form.splitType === "equal" ? participants.length : selectedCount} participante{form.splitType === "equal" ? participants.length : selectedCount !== 1 ? "s" : ""})
                                    {form.splitType === "equal" && (
                                        <span className="ml-1 text-amber-600">· todos incluídos</span>
                                    )}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Comprovante */}
                    <div>
                        <p className="mb-1.5 text-sm font-medium text-neutral-700">
                            Comprovante (opcional)
                        </p>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                            onDragLeave={() => setIsDraggingOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed py-6 text-center transition-colors ${isDraggingOver
                                ? "border-emerald-400 bg-emerald-50"
                                : receiptPreview
                                    ? "border-emerald-300 bg-emerald-50"
                                    : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                                }`}
                        >
                            <Paperclip className={`h-5 w-5 ${receiptPreview ? "text-emerald-600" : "text-neutral-300"}`} />
                            {receiptPreview ? (
                                <p className="text-sm font-medium text-emerald-700">{receiptPreview}</p>
                            ) : (
                                <>
                                    <p className="text-sm text-neutral-500">
                                        Arraste um arquivo ou{" "}
                                        <span className="font-medium text-emerald-700">clique para selecionar</span>
                                    </p>
                                    <p className="text-xs text-neutral-400">JPG, PNG ou PDF · máx. 5MB</p>
                                </>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,application/pdf"
                            className="hidden"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                        />
                    </div>

                    {/* Observações */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Observações
                        </label>
                        <textarea
                            value={form.notes}
                            onChange={(e) => update({ notes: e.target.value })}
                            rows={3}
                            placeholder="Detalhes adicionais sobre a despesa..."
                            className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-4 py-4 sm:px-5">
                    {!isValid && (
                        <p className="mr-auto flex items-center gap-1.5 text-xs text-neutral-400">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Preencha descrição, valor e categoria
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
                        disabled={!isValid || createExpense.isPending}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {createExpense.isPending ? "Salvando..." : "Salvar despesa"}
                    </button>
                </div>
            </div>
        </div>
    );
}