"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { useRouter } from 'next/navigation';
import type { CreateTripPayload } from '@/core/domain/trip/trip.types';

export function useTrips() {
    const { trip } = useRepositories();

    return useQuery({
        queryKey: ['trips'],
        queryFn: () => trip.findAll(),
    });
}

export function useCreateTrip() {
    const { trip } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: CreateTripPayload) => trip.create(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            addToast('Viagem criada! Convide os participantes para começar.');
            router.push(`/trips/${data.id}/dashboard`);
        },
        onError: () => {
            addToast('Erro ao criar viagem', 'error');
        },
    });
}

export function useDeleteTrip() {
    const { trip } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (tripId: string) => trip.remove(tripId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            addToast('Viagem removida com sucesso');
        },
        onError: () => {
            addToast('Erro ao remover viagem', 'error');
        },
    });
}