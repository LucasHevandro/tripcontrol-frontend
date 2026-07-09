export interface Payment {
    id: string;
    tripId: string;
    fromParticipantId: string;   // interno backend (TripParticipant.id) — mantido no response
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