"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { getErrorMessage } from '@/lib/utils';
import type { CreateExpensePayload } from '@/core/domain/expense/expense.types';

export function useExpenses(
    tripId: string,
    params?: { category?: string; page?: number; limit?: number },
) {
    const { expense } = useRepositories();

    return useQuery({
        queryKey: ['trips', tripId, 'expenses', params],
        queryFn: () => expense.findAll(tripId, params),
        enabled: !!tripId,
    });
}

export function useExpenseSummary(tripId: string) {
    const { expense } = useRepositories();

    return useQuery({
        queryKey: ['trips', tripId, 'expenses', 'summary'],
        queryFn: () => expense.getSummary(tripId),
        enabled: !!tripId,
    });
}

export function useCreateExpense(tripId: string) {
    const { expense } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: CreateExpensePayload) =>
            expense.create(tripId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips', tripId, 'expenses'] });
            queryClient.invalidateQueries({ queryKey: ['trips', tripId, 'dashboard'] });
            addToast('Despesa adicionada com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao adicionar despesa'), 'error');
        },
    });
}

export function useUpdateExpense(tripId: string) {
    const { expense } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: ({
            expenseId,
            payload,
        }: {
            expenseId: string;
            payload: Partial<CreateExpensePayload>;
        }) => expense.update(tripId, expenseId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips', tripId, 'expenses'] });
            queryClient.invalidateQueries({ queryKey: ['trips', tripId, 'dashboard'] });
            addToast('Despesa atualizada com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao atualizar despesa'), 'error');
        },
    });
}

export function useDeleteExpense(tripId: string) {
    const { expense } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (expenseId: string) => expense.remove(tripId, expenseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips', tripId, 'expenses'] });
            queryClient.invalidateQueries({ queryKey: ['trips', tripId, 'dashboard'] });
            addToast('Despesa removida com sucesso');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao remover despesa'), 'error');
        },
    });
}