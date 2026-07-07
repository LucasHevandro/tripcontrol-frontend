"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { getErrorMessage } from '@/lib/utils';
import type { CreateActivityPayload, ActivityStatus } from '@/core/domain/roadmap/roadmap.types';

export function useRoadmap(tripId: string) {
    const { roadmap } = useRepositories();

    return useQuery({
        queryKey: ['trips', tripId, 'roadmap'],
        queryFn: () => roadmap.findAll(tripId),
        enabled: !!tripId,
    });
}

export function useCreateActivity(tripId: string) {
    const { roadmap } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: CreateActivityPayload) =>
            roadmap.create(tripId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'roadmap'],
            });
            addToast('Atividade adicionada ao roteiro!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao adicionar atividade'), 'error');
        },
    });
}

export function useUpdateActivityStatus(tripId: string) {
    const { roadmap } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: ({
            activityId,
            status,
        }: {
            activityId: string;
            status: ActivityStatus;
        }) => roadmap.updateStatus(tripId, activityId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'roadmap'],
            });
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao atualizar status da atividade'), 'error');
        },
    });
}

export function useUpdateActivity(tripId: string) {
    const { roadmap } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: ({
            activityId,
            payload,
        }: {
            activityId: string;
            payload: Partial<CreateActivityPayload>;
        }) => roadmap.update(tripId, activityId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'roadmap'],
            });
            addToast('Atividade atualizada com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao atualizar atividade'), 'error');
        },
    });
}

export function useDeleteActivity(tripId: string) {
    const { roadmap } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (activityId: string) => roadmap.remove(tripId, activityId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'roadmap'],
            });
            addToast('Atividade removida com sucesso');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao remover atividade'), 'error');
        },
    });
}