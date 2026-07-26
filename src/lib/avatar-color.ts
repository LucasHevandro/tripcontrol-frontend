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

const CATEGORY_COLORS = [
    { bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
    { bar: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
    { bar: "bg-amber-500", badge: "bg-amber-50 text-amber-700" },
    { bar: "bg-violet-500", badge: "bg-violet-50 text-violet-700" },
    { bar: "bg-rose-500", badge: "bg-rose-50 text-rose-700" },
    { bar: "bg-cyan-500", badge: "bg-cyan-50 text-cyan-700" },
];

export function getCategoryColor(category: string) {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = (hash * 31 + category.charCodeAt(i)) % CATEGORY_COLORS.length;
    }
    return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length];
}