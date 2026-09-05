"use client";

import { useState } from 'react';
import { useForgotPassword } from '@/hooks/auth/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const forgotPassword = useForgotPassword();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        forgotPassword.mutate(email, {
            onSuccess: () => {
                router.push('/login');
            }
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#1f9d6f]">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
                <h1 className="text-2xl font-bold text-center text-primary">
                    Esqueci minha senha
                </h1>
                <p className="text-center text-neutral-500 mt-2">
                    Digite seu e-mail para receber um link de redefinição de senha
                </p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-700">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="seu-email@email.com"
                                required
                                disabled={forgotPassword.isPending}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-[#1f9d6f] text-white rounded-lg hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
                            disabled={forgotPassword.isPending}
                        >
                            {forgotPassword.isPending ? 'Enviando...' : 'Enviar'}
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