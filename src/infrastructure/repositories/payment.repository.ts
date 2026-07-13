import { apiClient } from '../http/api-client';
import type { IPaymentRepository } from '@/core/domain/payment/payment.repository.interface';
import type {
    Payment,
    CreatePaymentPayload,
    PaymentHistoryItem,
} from '@/core/domain/payment/payment.types';

export class HttpPaymentRepository implements IPaymentRepository {
    async create(
        tripId: string,
        payload: CreatePaymentPayload,
    ): Promise<Payment> {
        const { data } = await apiClient.post(
            `/trips/${tripId}/payments`,
            payload,
        );
        return data;
    }

    async findAll(tripId: string): Promise<PaymentHistoryItem[]> {
        const { data } = await apiClient.get(`/trips/${tripId}/payments`);
        return data;
    }

    async remove(tripId: string, paymentId: string): Promise<void> {
        await apiClient.delete(`/trips/${tripId}/payments/${paymentId}`);
    }
}