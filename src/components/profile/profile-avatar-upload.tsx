"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { useUpdateAvatar } from "@/hooks/user/use-user-profile";

interface ProfileAvatarUploadProps {
    userId: string;
    name: string;
    avatarUrl: string | null;
}

export function ProfileAvatarUpload({ userId, name, avatarUrl }: ProfileAvatarUploadProps) {
    const [preview, setPreview] = useState<string | null>(avatarUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const color = getAvatarColor(userId);
    const updateAvatar = useUpdateAvatar();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        updateAvatar.mutate(file);
    }

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={preview}
                        alt={name}
                        className="h-20 w-20 rounded-full object-cover"
                    />
                ) : (
                    <div
                        className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold ${color.bg} ${color.text}`}
                    >
                        {getInitials(name)}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-white hover:bg-neutral-700"
                    aria-label="Trocar foto de perfil"
                >
                    <Camera className="h-3.5 w-3.5" />
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <div>
                <p className="text-sm font-medium text-neutral-900">Foto de perfil</p>
                <p className="text-xs text-neutral-400">JPG ou PNG, até 5MB</p>
            </div>
        </div>
    );
}