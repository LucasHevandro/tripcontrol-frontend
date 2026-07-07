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