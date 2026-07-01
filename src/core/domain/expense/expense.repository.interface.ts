import type {
    PaginatedExpenses,
    ExpenseSummary,
    CreateExpensePayload,
    Expense,
} from './expense.types';

export interface IExpenseRepository {
    findAll(
        tripId: string,
        params?: { category?: string; page?: number; limit?: number },
    ): Promise<PaginatedExpenses>;
    getSummary(tripId: string): Promise<ExpenseSummary>;
    create(tripId: string, payload: CreateExpensePayload): Promise<Expense>;
    update(
        tripId: string,
        expenseId: string,
        payload: Partial<CreateExpensePayload>,
    ): Promise<Expense>;
    remove(tripId: string, expenseId: string): Promise<void>;
    uploadReceipt(tripId: string, expenseId: string, file: File): Promise<{ receiptUrl: string }>;
}