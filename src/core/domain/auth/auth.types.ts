export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
}