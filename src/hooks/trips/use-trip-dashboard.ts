"use client";

import { useQuery } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';

export function useTripDashboard(tripId: string) {
    const { trip } = useRepositories();

    return useQuery({
        queryKey: ['trips', tripId, 'dashboard'],
        queryFn: () => trip.getDashboard(tripId),
        enabled: !!tripId,
    });
}