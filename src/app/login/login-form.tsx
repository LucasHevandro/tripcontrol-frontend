"use client";

import { useState } from "react";
import { Eye, EyeOff, Sparkles, Wallet, Map, Building2, Users } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/auth/use-auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "@/contexts/theme-context";
import { useGoogleAuth } from "@/hooks/auth/use-auth";

const FEATURES = [
    { icon: Wallet, bg: "bg-amber-100", iconColor: "text-amber-700", text: "Controle financeiro compartilhado e acertos automáticos" },
    { icon: Map, bg: "bg-sky-100", iconColor: "text-sky-700", text: "Planejamento de roteiro colaborativo por dia" },
    { icon: Building2, bg: "bg-rose-100", iconColor: "text-rose-700", text: "Gerenciamento de reservas e checklist integrados" },
    { icon: Users, bg: "bg-violet-100", iconColor: "text-violet-700", text: "Convide participantes e gerencie a viagem juntos" },
];

const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

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

export default function LoginForm() {
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

    const googleAuth = useGoogleAuth();
    const { resolvedTheme } = useTheme();

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
        <div className="relative flex min-h-screen w-full">
            {/* Toggle de tema — canto superior direito */}
            <div className="absolute right-4 top-4 z-10">
                <ThemeToggle />
            </div>
            {/* Coluna esquerda — sempre verde, igual em ambos os temas */}
            <div className="hidden flex-col justify-between bg-[#1f9d6f] px-10 py-12 text-white md:flex md:w-1/2 lg:w-[40%]">
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
            <div className="flex w-full items-center justify-center px-6 py-12 dark:bg-neutral-950 md:w-1/2 lg:w-[60%]">
                <div className="w-full max-w-[380px]">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {tab === "entrar" ? "Bem-vindo de volta" : "Crie sua conta"}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {tab === "entrar"
                            ? "Entre na sua conta para continuar"
                            : "Comece a planejar sua próxima viagem em grupo"}
                    </p>

                    {/* Tabs */}
                    <div className="mt-6 flex gap-6 border-b border-neutral-200 dark:border-neutral-700">
                        {["entrar", "criar"].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTab(t as "entrar" | "criar")}
                                className={`relative pb-3 text-sm font-medium transition-colors ${tab === t
                                    ? "text-emerald-700 dark:text-emerald-400"
                                    : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                                    }`}
                            >
                                {t === "entrar" ? "Entrar" : "Criar conta"}
                                {tab === t && (
                                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-600 dark:bg-emerald-400" />
                                )}
                            </button>
                        ))}
                    </div>

                    {tab === "entrar" ? (
                        <form onSubmit={handleLogin} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="email" className={labelClass}>E-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
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
                            </div>

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                            >
                                {loginMutation.isPending ? "Entrando..." : "Entrar"}
                            </button>

                            <div className="relative my-2 flex items-center">
                                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                                <span className="px-3 text-xs text-neutral-400 dark:text-neutral-500">ou</span>
                                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                            </div>

                            <div className="flex justify-center">
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        if (credentialResponse.credential) {
                                            googleAuth.mutate(credentialResponse.credential);
                                        }
                                    }}
                                    onError={() => {
                                        // popup fechado ou falhou — a lib já lida com isso
                                    }}
                                    theme={resolvedTheme === "dark" ? "filled_black" : "outline"}
                                    text="continue_with"
                                    width="340"
                                />
                            </div>

                            <p className="pt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                Não tem conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => setTab("criar")}
                                    className="font-medium text-emerald-700 dark:text-emerald-400"
                                >
                                    Cadastre-se grátis
                                </button>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="fullName" className={labelClass}>Nome completo</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Seu nome completo"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="signupEmail" className={labelClass}>E-mail</label>
                                <input
                                    id="signupEmail"
                                    type="email"
                                    required
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className={labelClass}>Telefone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                                    placeholder="(00) 00000-0000"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="signupPassword" className={labelClass}>Senha</label>
                                <div className="relative">
                                    <input
                                        id="signupPassword"
                                        type={showSignupPassword ? "text" : "password"}
                                        required
                                        minLength={8}
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`${inputClass} pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSignupPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
                                    >
                                        {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {signupPassword.length > 0 && (
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
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className={labelClass}>Confirmar senha</label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full rounded-lg border px-3.5 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 ${passwordsMatch
                                            ? "border-neutral-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-neutral-700"
                                            : "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {!passwordsMatch && (
                                    <p className="mt-1.5 text-xs text-rose-600">As senhas não coincidem</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={registerMutation.isPending || !passwordsMatch}
                                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                            >
                                {registerMutation.isPending ? "Criando conta..." : "Criar conta"}
                            </button>

                            <div className="relative my-2 flex items-center">
                                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                                <span className="px-3 text-xs text-neutral-400 dark:text-neutral-500">ou</span>
                                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                            </div>

                            <div className="flex justify-center">
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        if (credentialResponse.credential) {
                                            googleAuth.mutate(credentialResponse.credential);
                                        }
                                    }}
                                    onError={() => {
                                        // popup fechado ou falhou — a lib já lida com isso
                                    }}
                                    theme={resolvedTheme === "dark" ? "filled_black" : "outline"}
                                    text="continue_with"
                                    width="340"
                                />
                            </div>

                            <p className="pt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                Já tem conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => setTab("entrar")}
                                    className="font-medium text-emerald-700 dark:text-emerald-400"
                                >
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
