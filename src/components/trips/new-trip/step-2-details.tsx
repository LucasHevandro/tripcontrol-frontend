import { OptionCard } from "./option-card";
import { TRIP_TYPE_OPTIONS } from "@/lib/new-trip-options";
import type { NewTripFormData } from "@/types/trip";

interface Step2DetailsProps {
    data: NewTripFormData;
    onChange: (updates: Partial<NewTripFormData>) => void;
}

export function Step2Details({ data, onChange }: Step2DetailsProps) {
    return (
        <div className="space-y-4">
            <div>
                <p className="mb-1.5 text-sm font-medium text-neutral-700">
                    Tipo de viagem
                </p>
                <div className="grid grid-cols-3 gap-2">
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
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Orçamento total do grupo (opcional)
                </label>
                <input
                    type="number"
                    inputMode="decimal"
                    value={data.budget}
                    onChange={(e) => onChange({ budget: e.target.value })}
                    placeholder="0"
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <p className="mt-1.5 text-xs text-neutral-400">
                    💡 Pode ser ajustado depois
                </p>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Descrição / observações (opcional)
                </label>
                <textarea
                    value={data.description}
                    onChange={(e) => onChange({ description: e.target.value })}
                    rows={3}
                    placeholder="Conte um pouco sobre essa viagem..."
                    className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>
        </div>
    );
}