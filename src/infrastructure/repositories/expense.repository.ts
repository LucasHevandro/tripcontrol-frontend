import { apiClient } from '../http/api-client';
import type { IExpenseRepository } from '@/core/domain/expense/expense.repository.interface';
import type {
    PaginatedExpenses,
    ExpenseSummary,
    CreateExpensePayload,
    Expense,
} from '@/core/domain/expense/expense.types';

export class HttpExpenseRepository implements IExpenseRepository {
    async findAll(
        tripId: string,
        params?: { category?: string; page?: number; limit?: number },
    ): Promise<PaginatedExpenses> {
        const { data } = await apiClient.get(`/trips/${tripId}/expenses`, {
            params,
        });
        return data;
    }

    async getSummary(tripId: string): Promise<ExpenseSummary> {
        const { data } = await apiClient.get(`/trips/${tripId}/expenses/summary`);
        return data;
    }

    async create(
        tripId: string,
        payload: CreateExpensePayload,
    ): Promise<Expense> {
        const { data } = await apiClient.post(
            `/trips/${tripId}/expenses`,
            payload,
        );
        return data;
    }

    async update(
        tripId: string,
        expenseId: string,
        payload: Partial<CreateExpensePayload>,
    ): Promise<Expense> {
        const { data } = await apiClient.patch(
            `/trips/${tripId}/expenses/${expenseId}`,
            payload,
        );
        return data;
    }

    async remove(tripId: string, expenseId: string): Promise<void> {
        await apiClient.delete(`/trips/${tripId}/expenses/${expenseId}`);
    }

    async uploadReceipt(
        tripId: string,
        expenseId: string,
        file: File,
    ): Promise<{ receiptUrl: string }> {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await apiClient.post(
            `/trips/${tripId}/expenses/${expenseId}/receipt`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        return data;
    }
}