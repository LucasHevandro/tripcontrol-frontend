import { apiClient } from '../http/api-client';
import type { IUserRepository } from '@/core/domain/user/user.repository.interface';
import type {
    UserProfile,
    UpdateProfilePayload,
    UpdatePasswordPayload,
    UpdatePreferencesPayload,
} from '@/core/domain/user/user.types';

export class HttpUserRepository implements IUserRepository {
    async getProfile(): Promise<UserProfile> {
        const { data } = await apiClient.get('/users/me');
        return data;
    }

    async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
        const { data } = await apiClient.patch('/users/me', payload);
        return data;
    }

    async updatePassword(
        payload: UpdatePasswordPayload,
    ): Promise<{ message: string }> {
        const { data } = await apiClient.patch('/users/me/password', payload);
        return data;
    }

    async updateAvatar(file: File): Promise<UserProfile> {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await apiClient.post('/users/me/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    }

    async updatePreferences(
        payload: UpdatePreferencesPayload,
    ): Promise<UserProfile> {
        const { data } = await apiClient.patch(
            '/users/me/preferences',
            payload,
        );
        return data;
    }
}