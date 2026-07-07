import type {
    UserProfile,
    UpdateProfilePayload,
    UpdatePasswordPayload,
    UpdatePreferencesPayload,
} from './user.types';

export interface IUserRepository {
    getProfile(): Promise<UserProfile>;
    updateProfile(payload: UpdateProfilePayload): Promise<UserProfile>;
    updatePassword(payload: UpdatePasswordPayload): Promise<{ message: string }>;
    updateAvatar(file: File): Promise<UserProfile>;
    updatePreferences(payload: UpdatePreferencesPayload): Promise<UserProfile>;
}