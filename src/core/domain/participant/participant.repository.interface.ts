export interface JoinResult {
    tripId: string;
    tripName: string;
    alreadyMember: boolean;
}

import type { ParticipantsResponse, Settlement } from './participant.types';

export interface IParticipantRepository {
    findAll(tripId: string): Promise<ParticipantsResponse>;
    inviteByEmail(tripId: string, emails: string[]): Promise<{ message: string }>;
    getInviteLink(tripId: string): Promise<{ inviteLink: string; inviteToken: string }>;
    joinByToken(token: string): Promise<JoinResult>;
    remove(tripId: string, participantId: string): Promise<void>;
    setSponsor(tripId: string, participantId: string, sponsorId: string | null): Promise<void>;
    getSettlements(tripId: string): Promise<{ settlements: Settlement[] }>;
    notifyDebtors(tripId: string): Promise<{ message: string }>;
}