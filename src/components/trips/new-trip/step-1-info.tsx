import { OptionCard } from "./option-card";
import { DESTINATION_TYPE_OPTIONS } from "@/lib/new-trip-options";
import type { NewTripFormData } from "@/types/trip";

interface Step1InfoProps {
    data: NewTripFormData;
    onChange: (updates: Partial<NewTripFormData>) => void;
}

export function Step1Info({ data, onChange }: Step1InfoProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Nome da viagem
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                    placeholder="Ex: Praia em janeiro"
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Destino
                </label>
                <input
                    type="text"
                    value={data.destination}
                    onChange={(e) => onChange({ destination: e.target.value })}
                    placeholder="Ex: Florianópolis, SC"
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            <div>
                <p className="mb-1.5 text-sm font-medium text-neutral-700">
                    Ou escolha um tipo de destino
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {DESTINATION_TYPE_OPTIONS.map((opt) => (
                        <OptionCard
                            key={opt.value}
                            label={opt.label}
                            icon={opt.icon}
                            iconBg={opt.iconBg}
                            iconColor={opt.iconColor}
                            isSelected={data.destinationType === opt.value}
                            onClick={() => onChange({ destinationType: opt.value })}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                        Data de início
                    </label>
                    <input
                        type="date"
                        value={data.startDate}
                        onChange={(e) => onChange({ startDate: e.target.value })}
                        className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                        Data de fim
                    </label>
                    <input
                        type="date"
                        value={data.endDate}
                        onChange={(e) => onChange({ endDate: e.target.value })}
                        min={data.startDate || undefined}
                        className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
            </div>
        </div>
    );
}