export interface ITokenStorage {
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
    setTokens(accessToken: string, refreshToken: string): void;
    clearTokens(): void;
}