"use client";

import { useState } from 'react';
import { useResetPassword } from '@/hooks/auth/use-auth';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const resetPassword = useResetPassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetPassword.mutate({ token: token!, password });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="w-full max-w-md">
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
                            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed"
                            disabled={resetPassword.isPending}
                        >
                            {resetPassword.isPending ? 'Redefinindo...' : 'Redefinir senha'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}