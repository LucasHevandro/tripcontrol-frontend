import { apiClient } from '../http/api-client';
import type { IPaymentRepository } from '@/core/domain/payment/payment.repository.interface';
import type { Payment, CreatePaymentPayload } from '@/core/domain/payment/payment.types';

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
}