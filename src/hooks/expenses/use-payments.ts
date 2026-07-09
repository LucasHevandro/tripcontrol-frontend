import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { getErrorMessage } from '@/lib/utils';
import type { CreatePaymentPayload } from '@/core/domain/payment/payment.types';

export function useCreatePayment(tripId: string) {
    const { payment } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: CreatePaymentPayload) =>
            payment.create(tripId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            addToast('Pagamento registrado');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao registrar pagamento'), 'error');
        },
    });
}