import { OptionCard } from "./option-card";
import { TRIP_TYPE_OPTIONS } from "@/lib/new-trip-options";
import type { NewTripFormData } from "@/types/trip";

const inputClass = "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

interface Step2DetailsProps {
    data: NewTripFormData;
    onChange: (updates: Partial<NewTripFormData>) => void;
}

export function Step2Details({ data, onChange }: Step2DetailsProps) {
    return (
        <div className="space-y-4">
            <div>
                <p className={labelClass}>Tipo de viagem</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TRIP_TYPE_OPTIONS.map((opt) => (
                        <OptionCard
                            key={opt.value}
                            label={opt.label}
                            icon={opt.icon}
                            iconBg={opt.iconBg}
                            iconColor={opt.iconColor}
                            isSelected={data.tripType === opt.value}
                            onClick={() => onChange({ tripType: opt.value })}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className={labelClass}>Orçamento total do grupo (opcional)</label>
                <input
                    type="number"
                    inputMode="decimal"
                    value={data.budget}
                    onChange={(e) => onChange({ budget: e.target.value })}
                    placeholder="0"
                    className={inputClass}
                />
                <p className="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                    💡 Pode ser ajustado depois
                </p>
            </div>

            <div>
                <label className={labelClass}>Descrição / observações (opcional)</label>
                <textarea
                    value={data.description}
                    onChange={(e) => onChange({ description: e.target.value })}
                    rows={3}
                    placeholder="Conte um pouco sobre essa viagem..."
                    className={`${inputClass} resize-none`}
                />
            </div>
        </div>
    );
}