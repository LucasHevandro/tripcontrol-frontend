import { Users } from "lucide-react";
import { TRIP_TYPE_LABEL } from "@/lib/new-trip-options";
import { formatCurrencyBRL, formatDateRange } from "@/lib/format";
import type { NewTripFormData } from "@/types/trip";
import { getTripDurationDays } from "./new-trip-form";

interface Step3ReviewProps {
    data: NewTripFormData;
}

export function Step3Review({ data }: Step3ReviewProps) {
    const durationDays = getTripDurationDays(data.startDate, data.endDate);
    const budgetNumber = Number(data.budget) || 0;

    const rows = [
        { label: "Nome", value: data.name || "—" },
        { label: "Destino", value: data.destination || "—" },
        {
            label: "Período",
            value: data.startDate && data.endDate
                ? formatDateRange(data.startDate, data.endDate).replace("–", " → ")
                : "—",
        },
        { label: "Duração", value: durationDays > 0 ? `${durationDays} dias` : "—" },
        { label: "Tipo", value: data.tripType ? TRIP_TYPE_LABEL[data.tripType] : "—" },
        { label: "Orçamento", value: budgetNumber > 0 ? formatCurrencyBRL(budgetNumber) : "Não definido" },
    ];

    return (
        <div className="space-y-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Confira as informações antes de criar a viagem:
            </p>

            <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                {rows.map((row, i) => (
                    <div
                        key={row.label}
                        className={`flex items-center justify-between px-4 py-2.5 text-sm ${i % 2 === 0
                                ? "bg-neutral-50 dark:bg-neutral-800"
                                : "bg-white dark:bg-neutral-900"
                            }`}
                    >
                        <span className="text-neutral-500 dark:text-neutral-400">{row.label}</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{row.value}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Users className="mt-0.5 h-4 w-4 shrink-0" />
                Após criar, você poderá convidar participantes via link ou e-mail.
            </div>
        </div>
    );
}
