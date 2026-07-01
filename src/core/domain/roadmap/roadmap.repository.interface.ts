import type {
    RoadmapResponse,
    RoadmapActivity,
    CreateActivityPayload,
    ActivityStatus,
} from './roadmap.types';

export interface IRoadmapRepository {
    findAll(tripId: string): Promise<RoadmapResponse>;
    create(tripId: string, payload: CreateActivityPayload): Promise<RoadmapActivity>;
    update(
        tripId: string,
        activityId: string,
        payload: Partial<CreateActivityPayload>,
    ): Promise<RoadmapActivity>;
    updateStatus(
        tripId: string,
        activityId: string,
        status: ActivityStatus,
    ): Promise<RoadmapActivity>;
    remove(tripId: string, activityId: string): Promise<void>;
}