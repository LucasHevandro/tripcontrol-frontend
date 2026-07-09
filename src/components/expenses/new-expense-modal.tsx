"use client";

import { useState, useRef, useMemo } from "react";
import { Plus, Paperclip, AlertCircle, Lightbulb } from "lucide-react";
import { getCategoryColor, getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatCurrencyBRL } from "@/lib/format";
import { EXPENSE_CATEGORIES } from "@/lib/expense-categories";
import type { NewExpenseFormData, ExpenseCategory } from "@/types/trip";
import { useCreateExpense } from "@/hooks/expenses/use-expenses";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

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
    const createExpense = useCreateExpense(tripId);

    function update(updates: Partial<NewExpenseFormData>) {
        setForm((prev) => ({ ...prev, ...updates }));
    }

    function toggleParticipant(id: string) {
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
        createExpense.mutate(
            {
                description: form.description,
                amount: Number(form.amount),
                date: form.date,
                category: form.category!,
                paidById: form.paidById,
                splitType: "EQUAL",
                splitParticipants: form.splitParticipantIds.map((id) => ({ participantId: id })),
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
        <Dialog
            open
            onClose={onClose}
            ariaLabel="Adicionar nova despesa"
            size="lg"
            mobileSheet
        >
            <DialogHeader
                title="Adicionar nova despesa"
                icon={<Plus className="h-4 w-4" />}
                onClose={onClose}
            />

            <DialogBody className="space-y-5">
                {/* Descrição */}
                <div>
                    <label className={labelClass}>Descrição da despesa</label>
                    <input
                        type="text"
                        value={form.description}
                        onChange={(e) => update({ description: e.target.value })}
                        placeholder="Ex: Jantar na Beira Mar"
                        className={inputClass}
                    />
                </div>

                {/* Valor + Data */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Valor (R$)</label>
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
                    </div>
                    <div>
                        <label className={labelClass}>Data</label>
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) => update({ date: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Categoria */}
                <div>
                    <p className={`${labelClass} mb-2`}>Categoria</p>
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
                                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600"
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Divisão</label>
                        <select
                            value={form.splitType}
                            onChange={(e) => handleSplitTypeChange(e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                        >
                            {SPLIT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dividir com */}
                <div>
                    <p className={`${labelClass} mb-2`}>Dividir com</p>
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
                                    disabled={isEqual}
                                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${isSelected
                                        ? isEqual
                                            ? "cursor-default border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950"
                                            : "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950"
                                        : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                                        }`}
                                >
                                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}>
                                        {getInitials(p.name)}
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-left text-sm text-neutral-900 dark:text-neutral-100">
                                        {p.name}
                                    </span>
                                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${isSelected
                                        ? "border-emerald-600 bg-emerald-600"
                                        : "border-neutral-300 dark:border-neutral-600"
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
                        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                            <span>
                                {form.splitType === "equal" ? "Dividido igualmente: " : "Valor por pessoa: "}
                                <strong>{formatCurrencyBRL(perPerson)}</strong>{" "}
                                ({form.splitType === "equal" ? participants.length : selectedCount} participante
                                {(form.splitType === "equal" ? participants.length : selectedCount) !== 1 ? "s" : ""})
                                {form.splitType === "equal" && (
                                    <span className="ml-1 text-amber-600 dark:text-amber-400">· todos incluídos</span>
                                )}
                            </span>
                        </div>
                    )}
                </div>

                {/* Comprovante */}
                <div>
                    <p className={`${labelClass} mb-1.5`}>Comprovante (opcional)</p>
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                        onDragLeave={() => setIsDraggingOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed py-6 text-center transition-colors ${isDraggingOver
                            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                            : receiptPreview
                                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950"
                                : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                            }`}
                    >
                        <Paperclip className={`h-5 w-5 ${receiptPreview ? "text-emerald-600" : "text-neutral-300 dark:text-neutral-600"}`} />
                        {receiptPreview ? (
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{receiptPreview}</p>
                        ) : (
                            <>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    Arraste um arquivo ou{" "}
                                    <span className="font-medium text-emerald-700 dark:text-emerald-400">clique para selecionar</span>
                                </p>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500">JPG, PNG ou PDF · máx. 5MB</p>
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
                    <label className={labelClass}>Observações</label>
                    <textarea
                        value={form.notes}
                        onChange={(e) => update({ notes: e.target.value })}
                        rows={3}
                        placeholder="Detalhes adicionais sobre a despesa..."
                        className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                    />
                </div>
            </DialogBody>

            <DialogFooter>
                {!isValid && (
                    <p className="mr-auto flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Preencha descrição, valor e categoria
                    </p>
                )}
                <Button variant="secondary" onClick={onClose} disabled={createExpense.isPending}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={!isValid} isLoading={createExpense.isPending}>
                    {createExpense.isPending ? "Salvando..." : "Salvar despesa"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}