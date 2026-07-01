import { apiClient } from '../http/api-client';
import type { IRoadmapRepository } from '@/core/domain/roadmap/roadmap.repository.interface';
import type {
    RoadmapResponse,
    RoadmapActivity,
    CreateActivityPayload,
    ActivityStatus,
} from '@/core/domain/roadmap/roadmap.types';

export class HttpRoadmapRepository implements IRoadmapRepository {
    async findAll(tripId: string): Promise<RoadmapResponse> {
        const { data } = await apiClient.get(`/trips/${tripId}/roadmap`);
        return data;
    }

    async create(
        tripId: string,
        payload: CreateActivityPayload,
    ): Promise<RoadmapActivity> {
        const { data } = await apiClient.post(
            `/trips/${tripId}/roadmap/activities`,
            payload,
        );
        return data;
    }

    async update(
        tripId: string,
        activityId: string,
        payload: Partial<CreateActivityPayload>,
    ): Promise<RoadmapActivity> {
        const { data } = await apiClient.patch(
            `/trips/${tripId}/roadmap/activities/${activityId}`,
            payload,
        );
        return data;
    }

    async updateStatus(
        tripId: string,
        activityId: string,
        status: ActivityStatus,
    ): Promise<RoadmapActivity> {
        const { data } = await apiClient.patch(
            `/trips/${tripId}/roadmap/activities/${activityId}/status`,
            { status: status.toUpperCase() },
        );
        return data;
    }

    async remove(tripId: string, activityId: string): Promise<void> {
        await apiClient.delete(
            `/trips/${tripId}/roadmap/activities/${activityId}`,
        );
    }
}