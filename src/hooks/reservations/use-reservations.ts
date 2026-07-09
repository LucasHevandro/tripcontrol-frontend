"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { getErrorMessage } from '@/lib/utils';
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
                queryKey: ['trips'],
            });
            addToast('Reserva salva com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao salvar reserva'), 'error');
        },
    });
}

export function useUpdateReservation(tripId: string) {
    const { reservation } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: ({
            reservationId,
            payload,
        }: {
            reservationId: string;
            payload: Partial<CreateReservationPayload>;
        }) => reservation.update(tripId, reservationId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['trips'],
            });
            addToast('Reserva atualizada com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao atualizar reserva'), 'error');
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
                queryKey: ['trips'],
            });
            addToast('Reserva removida com sucesso');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao remover reserva'), 'error');
        },
    });
}