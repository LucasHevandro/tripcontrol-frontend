"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { getErrorMessage } from '@/lib/utils';
import { getRedirectTarget } from '@/lib/auth-routing';
import type { LoginCredentials, RegisterCredentials } from '@/core/domain/auth/auth.types';
import { useUser } from "@/contexts/user-context";

export function useLogin() {
    const { auth } = useRepositories();
    const router = useRouter();
    const { addToast } = useToast();
    const queryClient = useQueryClient();
    const { setUser } = useUser();
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const redirectTo = getRedirectTarget(searchParams);

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => auth.login(credentials),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'me'], data.user);
            setUser(data.user);
            addToast('Login realizado com sucesso!');
            router.push(redirectTo);
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'E-mail ou senha incorretos'), 'error');
        },
    });
}

export function useRegister() {
    const { auth } = useRepositories();
    const router = useRouter();
    const { addToast } = useToast();
    const queryClient = useQueryClient();
    const { setUser } = useUser();
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const redirectTo = getRedirectTarget(searchParams);

    return useMutation({
        mutationFn: (credentials: RegisterCredentials) => auth.register(credentials),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'me'], data.user);
            setUser(data.user);
            addToast('Conta criada com sucesso!');
            router.push(redirectTo);
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao criar conta'), 'error');
        },
    });
}

export function useLogout() {
    const { auth } = useRepositories();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => auth.logout(),
        onSuccess: () => {
            queryClient.clear();
            router.push('/login');
        },
        onError: () => {
            // Mesmo com erro, limpa os dados locais
            queryClient.clear();
            router.push('/login');
        },
    });
}

export function useGoogleAuth() {
    const { auth } = useRepositories();
    const router = useRouter();
    const { addToast } = useToast();
    const queryClient = useQueryClient();
    const { setUser } = useUser();
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const redirectTo = getRedirectTarget(searchParams);

    return useMutation({
        mutationFn: (credential: string) => auth.googleLogin(credential),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'me'], data.user);
            setUser(data.user);
            addToast('Login com Google realizado com sucesso!');
            router.push(redirectTo);
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao entrar com Google'), 'error');
        },
    });
}

export function useForgotPassword() {
    const { auth } = useRepositories();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (email: string) => auth.forgotPassword(email),
        onSuccess: () => {
            addToast('E-mail de recuperação enviado com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao enviar e-mail de recuperação'), 'error');
        },
    });
}

export function useResetPassword() {
    const { auth } = useRepositories();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: ({ token, password }: { token: string, password: string }) => auth.resetPassword(token, password),
        onSuccess: () => {
            addToast('Senha redefinida com sucesso!');
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao redefinir senha'), 'error');
        },
    });
}
