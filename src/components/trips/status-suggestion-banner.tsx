"use client";

import { Button } from "@/components/ui/button";
import { useUpdateTrip } from "@/hooks/trips/use-trips";
import type { TripStatus } from "@/core/domain/trip/trip.types";
import { getErrorMessage } from "@/lib/utils";
import { useToast } from "@/contexts/toast-context";

const COPY: Record<Exclude<TripStatus, "PLANNING">, { message: string; action: string }> = {
    ONGOING: {
        message: "A data de início já chegou. Marcar a viagem como em andamento?",
        action: "Marcar em andamento",
    },
    COMPLETED: {
        message: "A viagem já terminou. Deseja concluí-la?",
        action: "Concluir viagem",
    },
};

interface StatusSuggestionBannerProps {
    tripId: string;
    suggestion: TripStatus | null;
    isOrganizer: boolean;
}

export function StatusSuggestionBanner({ tripId, suggestion, isOrganizer }: StatusSuggestionBannerProps) {


    if (!suggestion || !isOrganizer || suggestion === "PLANNING") return null;

    const copy = COPY[suggestion];

    const updateTrip = useUpdateTrip(tripId);
    const { addToast } = useToast();

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900 dark:bg-emerald-950">
            <p className="text-sm text-emerald-900 dark:text-emerald-100">{copy.message}</p>
            <Button
                size="sm"
                onClick={() =>
                    updateTrip.mutate({ status: suggestion }, {
                        onSuccess: () => {
                            addToast('Viagem atualizada com sucesso');
                        },
                        onError: (error) => {
                            addToast(getErrorMessage(error, 'Erro ao atualizar viagem'), 'error');
                        }
                    })
                }
                isLoading={updateTrip.isPending}
            >
                {copy.action}
            </Button>
        </div>
    );
}