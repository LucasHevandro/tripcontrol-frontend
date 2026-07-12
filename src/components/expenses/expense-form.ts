import type { CreateExpensePayload, SplitType } from "../../core/domain/expense/expense.types";
import type { NewExpenseFormData } from "../../types/trip";

export function getExpenseSplitType(splitType: NewExpenseFormData["splitType"]): SplitType {
    if (splitType === "individual") return "INDIVIDUAL";
    return "EQUAL";
}

export function calculatePerPersonAmount(amount: number, selectedCount: number): number {
    return selectedCount > 0 ? amount / selectedCount : 0;
}

export function isExpenseFormValid(form: NewExpenseFormData): boolean {
    return (
        form.description.trim() !== "" &&
        Number(form.amount) > 0 &&
        form.category !== null
    );
}

export function buildCreateExpensePayload(form: NewExpenseFormData): CreateExpensePayload {
    return {
        description: form.description,
        amount: Number(form.amount),
        date: form.date,
        category: form.category ?? "",
        paidById: form.paidById,
        splitType: getExpenseSplitType(form.splitType),
        splitParticipants: form.splitParticipantIds.map((id) => ({ participantId: id })),
        notes: form.notes || undefined,
    };
}
