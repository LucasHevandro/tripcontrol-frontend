import { apiClient, tokenStorage } from '../http/api-client';
import type { IAuthRepository } from '@/core/domain/auth/auth.repository.interface';
import type {
    LoginCredentials,
    RegisterCredentials,
    AuthResponse,
    AuthTokens,
} from '@/core/domain/auth/auth.types';

export class HttpAuthRepository implements IAuthRepository {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>(
            '/auth/login',
            credentials,
        );
        tokenStorage.setTokens(data.accessToken, data.refreshToken);
        return data;
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>(
            '/auth/register',
            credentials,
        );
        tokenStorage.setTokens(data.accessToken, data.refreshToken);
        return data;
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout');
        } finally {
            tokenStorage.clearTokens();
        }
    }

    async refresh(): Promise<AuthTokens> {
        const refreshToken = tokenStorage.getRefreshToken();
        const { data } = await apiClient.post<AuthTokens>(
            '/auth/refresh',
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } },
        );
        tokenStorage.setTokens(data.accessToken, data.refreshToken);
        return data;
    }

    async me(): Promise<AuthResponse['user']> {
        const { data } = await apiClient.get('/auth/me');
        return data;
    }
}