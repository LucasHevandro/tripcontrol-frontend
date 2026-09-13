"use client";

import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { useUpdateAvatar } from "@/hooks/user/use-user-profile";

interface ProfileAvatarUploadProps {
    userId: string;
    name: string;
    avatarUrl: string | null;
}

export function ProfileAvatarUpload({ userId, name, avatarUrl }: ProfileAvatarUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const color = getAvatarColor(userId);
    const updateAvatar = useUpdateAvatar();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        updateAvatar.mutate(file);
        // Permite escolher o mesmo arquivo de novo (ex.: após um erro)
        e.target.value = "";
    }

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt={name} className="h-20 w-20 rounded-full object-cover" />
                ) : (
                    <div className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold ${color.bg} ${color.text}`}>
                        {getInitials(name)}
                    </div>
                )}

                {updateAvatar.isPending && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={updateAvatar.isPending}
                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-white hover:bg-neutral-700 disabled:opacity-60 dark:border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                    aria-label="Trocar foto de perfil"
                >
                    <Camera className="h-3.5 w-3.5" />
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Foto de perfil</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">JPG, PNG ou WebP, até 5MB</p>
            </div>
        </div>
    );
}