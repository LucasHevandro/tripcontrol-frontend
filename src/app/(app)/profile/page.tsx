"use client";

import { useUserProfile } from "@/hooks/user/use-user-profile";
import { ProfileAvatarUpload } from "@/components/profile/profile-avatar-upload";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { PreferencesForm } from "@/components/profile/preferences-form";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
    const { data: profile, isLoading, isError, refetch, isRefetching } = useUserProfile();

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <div className="h-6 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-4 w-56 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-4">
                        <div className="h-64 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                        <div className="h-48 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                    <div className="h-64 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorState
                title="Erro ao carregar perfil"
                description="Verifique sua conexão e tente novamente."
                onRetry={() => refetch()}
                isRetrying={isRefetching}
                className="mt-6"
            />
        );
    }

    if (!profile) return null;

    return (
        <div className="space-y-4">
            <PageHeader title="Perfil" subtitle="Gerencie seus dados pessoais e preferências" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
                <div className="space-y-4">
                    {/* Dados pessoais */}
                    <Card padding="lg">
                        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            Dados pessoais
                        </h2>
                        <div className="mt-4">
                            <ProfileAvatarUpload
                                userId={profile.id}
                                name={profile.name}
                                avatarUrl={profile.avatarUrl}
                            />
                        </div>
                        <div className="mt-5">
                            <PersonalInfoForm profile={profile} />
                        </div>
                    </Card>

                    {/* Alterar senha */}
                    <Card padding="lg">
                        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            Alterar senha
                        </h2>
                        <div className="mt-4">
                            <ChangePasswordForm />
                        </div>
                    </Card>
                </div>

                {/* Preferências */}
                <Card padding="lg">
                    <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        Preferências
                    </h2>
                    <div className="mt-4">
                        <PreferencesForm profile={profile} />
                    </div>
                </Card>
            </div>
        </div>
    );
}