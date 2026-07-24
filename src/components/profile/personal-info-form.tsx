"use client";

import { useState } from "react";
import type { UserProfile } from "@/core/domain/user/user.types";
import { useUpdateProfile } from "@/hooks/user/use-user-profile";

interface PersonalInfoFormProps {
    profile: UserProfile;
}

const inputClass = "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

export function PersonalInfoForm({ profile }: PersonalInfoFormProps) {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [saved, setSaved] = useState(false);
    const updateProfile = useUpdateProfile();

    const hasChanges = name !== profile.name || email !== profile.email;

    function handleSave(e: React.FormEvent) {
        e.preventDefault();
        updateProfile.mutate(
            { name, email },
            {
                onSuccess: () => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                },
            },
        );
    }

    return (
        <form onSubmit={handleSave} className="space-y-4">
            <div>
                <label htmlFor="profile-name" className={labelClass}>Nome completo</label>
                <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="profile-email" className={labelClass}>E-mail</label>
                <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                />
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={!hasChanges || updateProfile.isPending}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
                </button>
                {saved && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        ✓ Salvo com sucesso
                    </span>
                )}
            </div>
        </form>
    );
}