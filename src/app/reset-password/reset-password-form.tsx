"use client";

import { useState } from 'react';
import { useResetPassword } from '@/hooks/auth/use-auth';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toast-context';
import { getPasswordStrength } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordForm() {

    const inputClass =
        "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

    const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const resetPassword = useResetPassword();
    const router = useRouter();
    const { addToast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordStrength = getPasswordStrength(password);
    const confirmPasswordStrength = getPasswordStrength(confirmPassword);
    const passwordsMatch = confirmPassword === password || confirmPassword.length === 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            addToast('Token de redefinição de senha inválido ou expirado', 'error');
            return;
        }

        if (!passwordsMatch) {
            addToast('As senhas não coincidem', 'error');
            return;
        }

        resetPassword.mutate({ token, password }, {
            onSuccess: () => {
                router.push('/login');
            }
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-primary dark:bg-neutral-950">
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm">
                <h1 className="text-2xl font-bold text-center text-primary">Redefinir senha</h1>
                <p className="text-center text-neutral-500 dark:text-neutral-400 mt-2">Digite sua nova senha</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <label htmlFor="password" className={labelClass}>Senha</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`${inputClass} pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {password.length > 0 && (
                            <div className="mt-2">
                                <div className="flex gap-1.5">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full ${i < passwordStrength.level
                                                ? passwordStrength.barColor
                                                : "bg-neutral-200 dark:bg-neutral-700"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className={`mt-1.5 text-xs ${passwordStrength.textColor}`}>
                                    {passwordStrength.label}
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className={labelClass}>Confirmar nova senha</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`${inputClass} pr-10`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        {confirmPassword.length > 0 && (
                            <div className="mt-2">
                                <div className="flex gap-1.5">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full ${i < confirmPasswordStrength.level
                                                ? confirmPasswordStrength.barColor
                                                : "bg-neutral-200 dark:bg-neutral-700"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className={`mt-1.5 text-xs ${confirmPasswordStrength.textColor}`}>
                                    {confirmPasswordStrength.label}
                                </p>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-[#1f9d6f] text-white rounded-lg hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
                            disabled={resetPassword.isPending}
                        >
                            {resetPassword.isPending ? 'Redefinindo...' : 'Redefinir senha'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <Link href="/login" className="text-primary hover:underline text-sm">
                        Voltar para login
                    </Link>
                </div>
            </div>
        </div>
    );
}

<div>

</div>