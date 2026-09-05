import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUpperEnum<T extends string>(value: string): T {
    return value.toUpperCase() as T;
}

/**
 * Extrai a mensagem de erro vinda da API (NestJS) de forma segura.
 * O backend retorna { message: string | string[] } no corpo da resposta.
 * Se não houver mensagem específica, usa o fallback informado.
 */
export function getErrorMessage(error: unknown, fallback = "Ocorreu um erro inesperado"): string {
    const anyError = error as {
        response?: { data?: { message?: string | string[] } };
        message?: string;
    };

    const apiMessage = anyError?.response?.data?.message;
    if (Array.isArray(apiMessage)) return apiMessage[0] ?? fallback;
    if (typeof apiMessage === "string" && apiMessage.trim()) return apiMessage;

    return fallback;
}

export function getPasswordStrength(password: string) {
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