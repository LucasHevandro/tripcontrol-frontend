"use client";

import { useUserProfile } from "@/hooks/user/use-user-profile";
import { ProfileAvatarUpload } from "@/components/profile/profile-avatar-upload";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { PreferencesForm } from "@/components/profile/preferences-form";

export default function ProfilePage() {
    const { data: profile, isLoading } = useUserProfile();

    if (isLoading) {
        return (
            <div className="space-y-1">
                <div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
                    <div className="h-96 animate-pulse rounded-xl bg-neutral-200" />
                    <div className="h-64 animate-pulse rounded-xl bg-neutral-200" />
                </div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="space-y-1">
            <div>
                <h1 className="text-lg font-semibold text-neutral-900">Perfil</h1>
                <p className="text-sm text-neutral-400">
                    Gerencie seus dados pessoais e preferências
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
                <div className="space-y-4">
                    <div className="rounded-xl border border-neutral-200 bg-white p-5">
                        <h2 className="text-sm font-semibold text-neutral-900">
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
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-5">
                        <h2 className="text-sm font-semibold text-neutral-900">
                            Alterar senha
                        </h2>
                        <div className="mt-4">
                            <ChangePasswordForm />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                    <h2 className="text-sm font-semibold text-neutral-900">
                        Preferências
                    </h2>
                    <div className="mt-4">
                        <PreferencesForm profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
}