/**
 * Extrai as iniciais de um nome completo para exibir no avatar.
 * "Lucas Hevandro" → "LH"
 * "Ana" → "A"
 * "Maria da Silva Costa" → "MC" (primeiro + último nome, ignora os do meio)
 */
export function getInitials(fullName: string): string {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0][0].toUpperCase();

    const first = parts[0][0];
    const last = parts[parts.length - 1][0];
    return `${first}${last}`.toUpperCase();
}