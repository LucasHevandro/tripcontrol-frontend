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
    googleLogin(credential: string): Promise<AuthResponse>;
    forgotPassword(email: string): Promise<{ message: string }>;
    resetPassword(token: string, password: string): Promise<{ message: string }>;
}