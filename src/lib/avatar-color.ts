// lib/avatar-color.ts

const AVATAR_COLORS = [
    { bg: "bg-emerald-100", text: "text-emerald-700" },
    { bg: "bg-sky-100", text: "text-sky-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-violet-100", text: "text-violet-700" },
    { bg: "bg-lime-100", text: "text-lime-700" },
    { bg: "bg-rose-100", text: "text-rose-700" },
];

/**
 * Deriva uma cor estável de avatar a partir de um id (ex: id do participante).
 * Mesmo id sempre retorna a mesma cor, sem precisar persistir nada.
 */
export function getAvatarColor(id: string): { bg: string; text: string } {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) % AVATAR_COLORS.length;
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}