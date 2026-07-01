import type { ITokenStorage } from './token-storage.interface';

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
        document.cookie = `${this.ACCESS_KEY}=${accessToken}; path=/; SameSite=Lax; max-age=${60 * 15}`;
        document.cookie = `${this.REFRESH_KEY}=${refreshToken}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
    }

    clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.REFRESH_KEY);

        // Remove os cookies também
        document.cookie = `${this.ACCESS_KEY}=; path=/; max-age=0`;
        document.cookie = `${this.REFRESH_KEY}=; path=/; max-age=0`;
    }
}