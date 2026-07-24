"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUpdatePassword } from "@/hooks/user/use-user-profile";

function getPasswordStrength(password: string) {
    if (password.length === 0) return { level: 0, label: "", barColor: "", textColor: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: "Senha fraca", barColor: "bg-rose-500", textColor: "text-rose-600" };
    if (score <= 2) return { level: 2, label: "Senha razoável", barColor: "bg-amber-500", textColor: "text-amber-600" };
    if (score <= 3) return { level: 3, label: "Senha boa", barColor: "bg-sky-500", textColor: "text-sky-600" };
    return { level: 4, label: "Senha forte", barColor: "bg-emerald-500", textColor: "text-emerald-600" };
}

const inputClass = "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

export function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);
    const updatePassword = useUpdatePassword();

    const strength = getPasswordStrength(newPassword);
    const passwordsMatch = confirmPassword.length === 0 || confirmPassword === newPassword;
    const canSubmit =
        currentPassword.length > 0 &&
        newPassword.length >= 8 &&
        confirmPassword === newPassword;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        updatePassword.mutate(
            { currentPassword, newPassword },
            {
                onSuccess: () => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                },
            },
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="current-password" className={labelClass}>Senha atual</label>
                <div className="relative">
                    <input
                        id="current-password"
                        type={showPasswords ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={`${inputClass} pr-10`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswords((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                        aria-label={showPasswords ? "Ocultar senhas" : "Mostrar senhas"}
                    >
                        {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="new-password" className={labelClass}>Nova senha</label>
                <input
                    id="new-password"
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    className={inputClass}
                />
                {newPassword.length > 0 && (
                    <div className="mt-2">
                        <div className="flex gap-1.5">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${i < strength.level ? strength.barColor : "bg-neutral-200 dark:bg-neutral-700"}`}
                                />
                            ))}
                        </div>
                        <p className={`mt-1.5 text-xs ${strength.textColor}`}>{strength.label}</p>
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="confirm-new-password" className={labelClass}>Confirmar nova senha</label>
                <input
                    id="confirm-new-password"
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:ring-2 dark:bg-neutral-800 dark:text-neutral-100 ${passwordsMatch
                            ? "border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-neutral-700"
                            : "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                        }`}
                />
                {!passwordsMatch && (
                    <p className="mt-1.5 text-xs text-rose-600">As senhas não coincidem</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!canSubmit || updatePassword.isPending}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {updatePassword.isPending ? "Atualizando..." : "Atualizar senha"}
            </button>
        </form>
    );
}