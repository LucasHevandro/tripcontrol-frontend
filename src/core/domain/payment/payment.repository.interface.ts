import type {
    Payment,
    CreatePaymentPayload,
    PaymentHistoryItem,
} from './payment.types';

export interface IPaymentRepository {
    create(tripId: string, payload: CreatePaymentPayload): Promise<Payment>;
    findAll(tripId: string): Promise<PaymentHistoryItem[]>;
    remove(tripId: string, paymentId: string): Promise<void>;
}