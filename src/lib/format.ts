export function formatCurrencyBRL(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
}

/** Formata um saldo com sinal explícito: "+ R$ 210" ou "- R$ 90". */
export function formatBalance(balance: number): string {
    const sign = balance >= 0 ? "+" : "-";
    return `${sign} ${formatCurrencyBRL(Math.abs(balance))}`;
}

/** "2026-01-10" + "2026-01-17" → "10–17 jan 2026" */
export function formatDateRange(startISO: string, endISO: string): string {
    // Extrai só a parte da data se vier com horário
    const startDate = startISO.split('T')[0];
    const endDate = endISO.split('T')[0];

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = end
        .toLocaleDateString('pt-BR', { month: 'short' })
        .replace('.', '');
    const year = end.getFullYear();

    return `${startDay}–${endDay} ${month} ${year}`;
}