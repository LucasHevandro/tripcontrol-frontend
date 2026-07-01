"use client";

import { useState } from "react";
import type { UserProfile } from "@/core/domain/user/user.types";
import { useToast } from "@/contexts/toast-context";
import { useUpdateProfile } from "@/hooks/user/use-user-profile";

interface PersonalInfoFormProps {
    profile: UserProfile;
}

export function PersonalInfoForm({ profile }: PersonalInfoFormProps) {
    const { addToast } = useToast();
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
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Nome completo
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    E-mail
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={!hasChanges || updateProfile.isPending}
                    className="..."
                >
                    {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
                </button>
                {saved && (
                    <span className="text-xs font-medium text-emerald-600">
                        ✓ Salvo com sucesso
                    </span>
                )}
            </div>
        </form>
    );
}