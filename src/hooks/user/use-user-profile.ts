"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRepositories } from '@/providers/repositories.provider';
import { useToast } from '@/contexts/toast-context';
import type {
    UpdateProfilePayload,
    UpdatePasswordPayload,
    UpdatePreferencesPayload,
} from '@/core/domain/user/user.types';

export function useUserProfile() {
    const { user } = useRepositories();

    return useQuery({
        queryKey: ['user', 'profile'],
        queryFn: () => user.getProfile(),
    });
}

export function useUpdateProfile() {
    const { user } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => user.updateProfile(payload),
        onSuccess: (data) => {
            queryClient.setQueryData(['user', 'profile'], data);
            addToast('Dados salvos com sucesso!');
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ?? 'Erro ao salvar dados';
            addToast(message, 'error');
        },
    });
}

export function useUpdatePassword() {
    const { user } = useRepositories();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: UpdatePasswordPayload) =>
            user.updatePassword(payload),
        onSuccess: () => {
            addToast('Senha atualizada com sucesso!');
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message ?? 'Erro ao atualizar senha';
            addToast(message, 'error');
        },
    });
}

export function useUpdateAvatar() {
    const { user } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (file: File) => user.updateAvatar(file),
        onSuccess: (data) => {
            queryClient.setQueryData(['user', 'profile'], data);
            addToast('Foto atualizada com sucesso!');
        },
        onError: () => {
            addToast('Erro ao atualizar foto', 'error');
        },
    });
}

export function useUpdatePreferences() {
    const { user } = useRepositories();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: (payload: UpdatePreferencesPayload) =>
            user.updatePreferences(payload),
        onSuccess: (data) => {
            queryClient.setQueryData(['user', 'profile'], data);
            addToast('Preferências salvas!');
        },
        onError: () => {
            addToast('Erro ao salvar preferências', 'error');
        },
    });
}