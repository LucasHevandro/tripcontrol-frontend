import { apiClient } from '../http/api-client';
import type { IParticipantRepository, JoinResult } from '@/core/domain/participant/participant.repository.interface';
import type {
    ParticipantsResponse,
    Settlement,
} from '@/core/domain/participant/participant.types';

export class HttpParticipantRepository implements IParticipantRepository {
    async findAll(tripId: string): Promise<ParticipantsResponse> {
        const { data } = await apiClient.get(`/trips/${tripId}/participants`);
        return data;
    }

    async inviteByEmail(
        tripId: string,
        emails: string[],
    ): Promise<{ message: string }> {
        const { data } = await apiClient.post(
            `/trips/${tripId}/participants/invite`,
            { emails },
        );
        return data;
    }

    async getInviteLink(
        tripId: string,
    ): Promise<{ inviteLink: string; inviteToken: string }> {
        const { data } = await apiClient.get(
            `/trips/${tripId}/participants/invite-link`,
        );
        return data;
    }

    async joinByToken(token: string): Promise<JoinResult> {
        const { data } = await apiClient.post<JoinResult>(`/trips/join/${token}`);
        return data;
    }

    async remove(tripId: string, participantId: string): Promise<void> {
        await apiClient.delete(
            `/trips/${tripId}/participants/${participantId}`,
        );
    }

    async setSponsor(
        tripId: string,
        participantId: string,
        sponsorId: string | null,
    ): Promise<void> {
        await apiClient.patch(
            `/trips/${tripId}/participants/${participantId}/sponsor`,
            { sponsorId },
        );
    }

    async getSettlements(
        tripId: string,
    ): Promise<{ settlements: Settlement[] }> {
        const { data } = await apiClient.get(
            `/trips/${tripId}/participants/settlements`,
        );
        return data;
    }

    async notifyDebtors(tripId: string): Promise<{ message: string }> {
        const { data } = await apiClient.post(
            `/trips/${tripId}/participants/settlements/notify`,
        );
        return data;
    }
}