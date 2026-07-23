export interface Participant {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: ParticipantRole;
    totalPaid: number;
    individualQuota: number;
    balance: number;
    sponsorId: string | null;
    sponsorName: string | null;
}
export type ParticipantRole = 'ORGANIZER' | 'MEMBER';

export interface Settlement {
    id: string;
    fromParticipantId: string;
    fromName: string;
    toParticipantId: string;
    toName: string;
    amount: number;
    description: string;
}

export interface ParticipantsResponse {
    tripName: string;
    tripPeriod: string;
    participantCount: number;
    organizerCount: number;
    totalSpent: number;
    perPersonAverage: number;
    pendingSettlementsCount: number;
    pendingSettlementsAmount: number;
    groupStatusLabel: string;
    groupStatusSublabel: string;
    inviteLink: string;
    participants: Participant[];
    settlementSummary: Settlement[];
}