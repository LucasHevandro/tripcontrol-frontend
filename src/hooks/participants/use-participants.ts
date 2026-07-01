"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';

export function useParticipants(tripId: string) {
    const { participant } = useRepositories();

    return useQuery({
        queryKey: ['trips', tripId, 'participants'],
        queryFn: () => participant.findAll(tripId),
        enabled: !!tripId,
    });
}

export function useInviteByEmail(tripId: string) {
    const { participant } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (emails: string[]) =>
            participant.inviteByEmail(tripId, emails),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'participants'],
            });
            addToast(data.message);
        },
        onError: () => {
            addToast('Erro ao enviar convites', 'error');
        },
    });
}

export function useRemoveParticipant(tripId: string) {
    const { participant } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (participantId: string) =>
            participant.remove(tripId, participantId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'participants'],
            });
            addToast('Participante removido com sucesso');
        },
        onError: () => {
            addToast('Erro ao remover participante', 'error');
        },
    });
}

export function useNotifyDebtors(tripId: string) {
    const { participant } = useRepositories();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: () => participant.notifyDebtors(tripId),
        onSuccess: () => {
            addToast('Devedores notificados com sucesso!');
        },
        onError: () => {
            addToast('Erro ao notificar devedores', 'error');
        },
    });
}