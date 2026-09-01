"use client";

import { useState } from 'react';
import { useResetPassword } from '@/hooks/auth/use-auth';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import router from 'next/router';

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const resetPassword = useResetPassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetPassword.mutate({ token: token!, password });

        if (resetPassword.isSuccess) {
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#1f9d6f]">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
                <h1 className="text-2xl font-bold text-center text-primary">Redefinir senha</h1>
                <p className="text-center text-neutral-500 mt-2">Digite sua nova senha</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-neutral-700">Nova senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                                disabled={resetPassword.isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">Confirmar nova senha</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                                disabled={resetPassword.isPending}
                            />
                        </div>
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