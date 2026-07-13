export interface Payment {
    id: string;
    tripId: string;
    fromParticipantId: string;
    toParticipantId: string;
    amount: number;
    paidAt: string;
    notes?: string | null;
}

export interface CreatePaymentPayload {
    fromUserId: string;
    toUserId: string;
    amount: number;
    notes?: string;
}

export interface PaymentHistoryItem {
    id: string;
    amount: number;
    paidAt: string;
    notes: string | null;
    canDelete: boolean;
    from: {
        userId: string;
        name: string;
        avatarUrl: string | null;
    };
    to: {
        userId: string;
        name: string;
        avatarUrl: string | null;
    };
}