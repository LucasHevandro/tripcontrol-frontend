"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

export function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);

    const strength = getPasswordStrength(newPassword);
    const passwordsMatch = confirmPassword.length === 0 || confirmPassword === newPassword;
    const canSubmit =
        currentPassword.length > 0 &&
        newPassword.length >= 8 &&
        confirmPassword === newPassword;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        // TODO: PATCH /users/me/password { currentPassword, newPassword }
        console.log("Trocar senha");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Senha atual
                </label>
                <div className="relative">
                    <input
                        type={showPasswords ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 pr-10 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswords((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        aria-label={showPasswords ? "Ocultar senhas" : "Mostrar senhas"}
                    >
                        {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Nova senha
                </label>
                <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                {newPassword.length > 0 && (
                    <div className="mt-2">
                        <div className="flex gap-1.5">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${i < strength.level ? strength.barColor : "bg-neutral-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className={`mt-1.5 text-xs ${strength.textColor}`}>{strength.label}</p>
                    </div>
                )}
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Confirmar nova senha
                </label>
                <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:ring-2 ${passwordsMatch
                            ? "border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                            : "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                        }`}
                />
                {!passwordsMatch && (
                    <p className="mt-1.5 text-xs text-rose-600">As senhas não coincidem</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Atualizar senha
            </button>
        </form>
    );
}