"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import { getErrorMessage } from '@/lib/utils';
import type { LoginCredentials, RegisterCredentials } from '@/core/domain/auth/auth.types';

export function useLogin() {
    const { auth } = useRepositories();
    const router = useRouter();
    const { addToast } = useToast();
    const queryClient = useQueryClient();
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const redirectTo = searchParams?.get('redirect') ?? '/trips';

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => auth.login(credentials),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'me'], data.user);
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
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const redirectTo = searchParams?.get('redirect') ?? '/trips';

    return useMutation({
        mutationFn: (credentials: RegisterCredentials) => auth.register(credentials),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'me'], data.user);
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
    const { addToast } = useToast();
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
    const searchParams =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null;
    const redirectTo = searchParams?.get('redirect') ?? '/trips';

    return useMutation({
        mutationFn: (credential: string) => auth.googleLogin(credential),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'me'], data.user);
            addToast('Login com Google realizado com sucesso!');
            router.push(redirectTo);
        },
        onError: (error) => {
            addToast(getErrorMessage(error, 'Erro ao entrar com Google'), 'error');
        },
    });
}