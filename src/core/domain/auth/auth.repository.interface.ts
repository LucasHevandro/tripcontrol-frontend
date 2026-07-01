import type {
    LoginCredentials,
    RegisterCredentials,
    AuthResponse,
    AuthTokens,
} from './auth.types';

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    register(credentials: RegisterCredentials): Promise<AuthResponse>;
    logout(): Promise<void>;
    refresh(): Promise<AuthTokens>;
    me(): Promise<AuthResponse['user']>;
}