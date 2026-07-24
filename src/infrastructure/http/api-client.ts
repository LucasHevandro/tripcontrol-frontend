import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosError,
} from 'axios';
import { LocalStorageTokenAdapter } from './local-storage-token.adapter';

const tokenStorage = new LocalStorageTokenAdapter();

export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Flag pra evitar múltiplas tentativas de refresh simultâneas
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

function processQueue(token: string) {
    refreshQueue.forEach((cb) => cb(token));
    refreshQueue = [];
}

// Interceptor de RESPONSE — lida com 401 e faz refresh automático
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        const is401 = error.response?.status === 401;
        const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh');
        const alreadyRetried = originalRequest._retry;

        if (is401 && !isRefreshEndpoint && !alreadyRetried) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // Fila de requisições esperando o refresh terminar
                return new Promise((resolve) => {
                    refreshQueue.push((token: string) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = tokenStorage.getRefreshToken();
                if (!refreshToken) throw new Error('Sem refresh token');

                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1'}/auth/refresh`,
                    {},
                    { headers: { Authorization: `Bearer ${refreshToken}` } },
                );

                const { accessToken, refreshToken: newRefreshToken } = data;
                tokenStorage.setTokens(accessToken, newRefreshToken);
                processQueue(accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return apiClient(originalRequest);
            } catch {
                // Refresh falhou — limpa tokens e redireciona pro login
                tokenStorage.clearTokens();
                refreshQueue = [];
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export { tokenStorage };