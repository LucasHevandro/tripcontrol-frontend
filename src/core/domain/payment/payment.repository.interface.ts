import type { Payment, CreatePaymentPayload } from './payment.types';

export interface IPaymentRepository {
    create(tripId: string, payload: CreatePaymentPayload): Promise<Payment>;
}