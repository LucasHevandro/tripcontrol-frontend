"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import type {
    CreateReservationPayload,
    ReservationCategory,
} from '@/core/domain/reservation/reservation.types';

export function useReservations(
    tripId: string,
    category?: ReservationCategory,
) {
    const { reservation } = useRepositories();

    return useQuery({
        queryKey: ['trips', tripId, 'reservations', category],
        queryFn: () => reservation.findAll(tripId, category),
        enabled: !!tripId,
    });
}

export function useCreateReservation(tripId: string) {
    const { reservation } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: CreateReservationPayload) =>
            reservation.create(tripId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'reservations'],
            });
            addToast('Reserva salva com sucesso!');
        },
        onError: () => {
            addToast('Erro ao salvar reserva', 'error');
        },
    });
}

export function useDeleteReservation(tripId: string) {
    const { reservation } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (reservationId: string) =>
            reservation.remove(tripId, reservationId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips', tripId, 'reservations'],
            });
            addToast('Reserva removida com sucesso');
        },
        onError: () => {
            addToast('Erro ao remover reserva', 'error');
        },
    });
}