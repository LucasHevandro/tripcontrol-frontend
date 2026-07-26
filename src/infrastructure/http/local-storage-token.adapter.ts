import type { ITokenStorage } from './token-storage.interface';

// Decodifica o `exp` do JWT (payload em base64url) pra usar como max-age real
// do cookie, em vez de duplicar o TTL como número fixo (que desalinha se
// JWT_EXPIRES_IN/JWT_REFRESH_EXPIRES_IN mudar no backend).
function getJwtExpirySeconds(token: string): number | null {
    try {
        const payload = token.split('.')[1];
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const { exp } = JSON.parse(json) as { exp?: number };
        if (typeof exp !== 'number') return null;
        const secondsLeft = exp - Math.floor(Date.now() / 1000);
        return secondsLeft > 0 ? secondsLeft : null;
    } catch {
        return null;
    }
}

// TODO: para trocar pra cookie httpOnly no futuro, crie um
// CookieTokenAdapter implementando a mesma interface ITokenStorage
// e substitua onde LocalStorageTokenAdapter é instanciado.
export class LocalStorageTokenAdapter implements ITokenStorage {
    private readonly ACCESS_KEY = 'tc_access_token';
    private readonly REFRESH_KEY = 'tc_refresh_token';

    getAccessToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.ACCESS_KEY);
    }

    getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.REFRESH_KEY);
    }

    setTokens(accessToken: string, refreshToken: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.ACCESS_KEY, accessToken);
        localStorage.setItem(this.REFRESH_KEY, refreshToken);

        // Salva também em cookie pra o middleware conseguir ler no servidor
        // SameSite=Lax protege contra CSRF sem bloquear navegação normal
        const accessMaxAge = getJwtExpirySeconds(accessToken) ?? 60 * 15;
        const refreshMaxAge = getJwtExpirySeconds(refreshToken) ?? 60 * 60 * 24 * 7;
        document.cookie = `${this.ACCESS_KEY}=${accessToken}; path=/; Secure; SameSite=Lax; max-age=${accessMaxAge}`;
        document.cookie = `${this.REFRESH_KEY}=${refreshToken}; path=/; Secure; SameSite=Lax; max-age=${refreshMaxAge}`;
    }

    clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.REFRESH_KEY);

        document.cookie = `${this.ACCESS_KEY}=; path=/; max-age=0`;
        document.cookie = `${this.REFRESH_KEY}=; path=/; max-age=0`;
    }
}