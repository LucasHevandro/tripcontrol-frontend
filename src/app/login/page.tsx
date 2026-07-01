"use client";

import { useState } from "react";
import { Eye, EyeOff, Sparkles, Wallet, Map, Building2, Users } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/auth/use-auth";

const FEATURES = [
    { icon: Wallet, bg: "bg-amber-100", iconColor: "text-amber-700", text: "Controle financeiro compartilhado e acertos automáticos" },
    { icon: Map, bg: "bg-sky-100", iconColor: "text-sky-700", text: "Planejamento de roteiro colaborativo por dia" },
    { icon: Building2, bg: "bg-rose-100", iconColor: "text-rose-700", text: "Gerenciamento de reservas e checklist integrados" },
    { icon: Users, bg: "bg-violet-100", iconColor: "text-violet-700", text: "Convide participantes e gerencie a viagem juntos" },
];

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

export default function LoginPage() {
    const [tab, setTab] = useState<"entrar" | "criar">("entrar");

    // Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    // Cadastro
    const [fullName, setFullName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const registerMutation = useRegister();

    const passwordStrength = getPasswordStrength(signupPassword);
    const passwordsMatch = confirmPassword.length === 0 || confirmPassword === signupPassword;

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    }

    function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        if (signupPassword !== confirmPassword) return;
        registerMutation.mutate({
            name: fullName,
            email: signupEmail,
            password: signupPassword,
            phone: phone || undefined,
        });
    }

    function formatPhone(value: string) {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    return (
        <div className="min-h-screen w-full flex bg-[#f7f6f1]">
            {/* Coluna esquerda */}
            <div className="hidden md:flex md:w-1/2 lg:w-[40%] flex-col justify-between bg-[#1f9d6f] px-10 py-12 text-white">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold">TripControl</span>
                    </div>
                    <h1 className="mt-12 text-3xl font-bold leading-tight lg:text-[2.1rem]">
                        Organize sua viagem em grupo com facilidade
                    </h1>
                    <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-emerald-50/90">
                        Planejamento, finanças e roteiro em um único lugar. Sem planilhas, sem confusão.
                    </p>
                </div>
                <ul className="space-y-4">
                    {FEATURES.map((f) => {
                        const Icon = f.icon;
                        return (
                            <li key={f.text} className="flex items-center gap-3">
                                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${f.bg} ${f.iconColor}`}>
                                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                                </span>
                                <span className="text-[15px] text-emerald-50/95">{f.text}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Coluna direita */}
            <div className="flex w-full md:w-1/2 lg:w-[60%] items-center justify-center px-6 py-12">
                <div className="w-full max-w-[380px]">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        {tab === "entrar" ? "Bem-vindo de volta" : "Crie sua conta"}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        {tab === "entrar" ? "Entre na sua conta para continuar" : "Comece a planejar sua próxima viagem em grupo"}
                    </p>

                    {/* Tabs */}
                    <div className="mt-6 flex gap-6 border-b border-neutral-200">
                        {["entrar", "criar"].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTab(t as "entrar" | "criar")}
                                className={`relative pb-3 text-sm font-medium transition-colors ${tab === t ? "text-emerald-700" : "text-neutral-400 hover:text-neutral-600"}`}
                            >
                                {t === "entrar" ? "Entrar" : "Criar conta"}
                                {tab === t && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-600" />}
                            </button>
                        ))}
                    </div>

                    {tab === "entrar" ? (
                        <form onSubmit={handleLogin} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">E-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-700">Senha</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <a href="/esqueci-senha" className="text-sm font-medium text-emerald-700">Esqueci minha senha</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                            >
                                {loginMutation.isPending ? "Entrando..." : "Entrar"}
                            </button>

                            <div className="relative my-2 flex items-center">
                                <div className="h-px flex-1 bg-neutral-200" />
                                <span className="px-3 text-xs text-neutral-400">ou</span>
                                <div className="h-px flex-1 bg-neutral-200" />
                            </div>

                            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                                <GoogleIcon className="h-4 w-4" />
                                Continuar com Google
                            </button>

                            <p className="pt-1 text-center text-sm text-neutral-500">
                                Não tem conta?{" "}
                                <button type="button" onClick={() => setTab("criar")} className="font-medium text-emerald-700">
                                    Cadastre-se grátis
                                </button>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-neutral-700">Nome completo</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Seu nome completo"
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="signupEmail" className="mb-1.5 block text-sm font-medium text-neutral-700">E-mail</label>
                                <input
                                    id="signupEmail"
                                    type="email"
                                    required
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-700">Telefone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                                    placeholder="(00) 00000-0000"
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="signupPassword" className="mb-1.5 block text-sm font-medium text-neutral-700">Senha</label>
                                <div className="relative">
                                    <input
                                        id="signupPassword"
                                        type={showSignupPassword ? "text" : "password"}
                                        required
                                        minLength={8}
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                    <button type="button" onClick={() => setShowSignupPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                        {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {signupPassword.length > 0 && (
                                    <div className="mt-2">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div key={i} className={`h-1 flex-1 rounded-full ${i < passwordStrength.level ? passwordStrength.barColor : "bg-neutral-200"}`} />
                                            ))}
                                        </div>
                                        <p className={`mt-1.5 text-xs ${passwordStrength.textColor}`}>{passwordStrength.label}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-neutral-700">Confirmar senha</label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 ${passwordsMatch ? "border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500/20" : "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"}`}
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {!passwordsMatch && <p className="mt-1.5 text-xs text-rose-600">As senhas não coincidem</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={registerMutation.isPending || !passwordsMatch}
                                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                            >
                                {registerMutation.isPending ? "Criando conta..." : "Criar conta"}
                            </button>

                            <div className="relative my-2 flex items-center">
                                <div className="h-px flex-1 bg-neutral-200" />
                                <span className="px-3 text-xs text-neutral-400">ou</span>
                                <div className="h-px flex-1 bg-neutral-200" />
                            </div>

                            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                                <GoogleIcon className="h-4 w-4" />
                                Continuar com Google
                            </button>

                            <p className="pt-1 text-center text-sm text-neutral-500">
                                Já tem conta?{" "}
                                <button type="button" onClick={() => setTab("entrar")} className="font-medium text-emerald-700">
                                    Entrar
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.93l-3.86-2.97c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.07C3.26 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.27 14.29A7.13 7.13 0 0 1 4.86 12c0-.79.14-1.56.41-2.29V6.64H1.27A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.27 5.36l4-3.07z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.27 6.64l4 3.07C6.22 6.86 8.87 4.75 12 4.75z" />
        </svg>
    );
}