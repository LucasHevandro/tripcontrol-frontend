export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatarUrl: string | null;
    language: string;
    currency: string;
    notifyEmail: boolean;
    notifyExpenseAlerts: boolean;
    notifyRoadmapReminders: boolean;
    createdAt: string;
}

export interface UpdateProfilePayload {
    name?: string;
    email?: string;
    phone?: string;
}

export interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export interface UpdatePreferencesPayload {
    language?: string;
    currency?: string;
    notifyEmail?: boolean;
    notifyExpenseAlerts?: boolean;
    notifyRoadmapReminders?: boolean;
}