import { OptionCard } from "./option-card";
import { DESTINATION_TYPE_OPTIONS } from "@/lib/new-trip-options";
import { LocationAutocomplete } from "@/components/ui/location-autocomplete";
import type { NewTripFormData } from "@/types/trip";

const inputClass = "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

interface Step1InfoProps {
    data: NewTripFormData;
    onChange: (updates: Partial<NewTripFormData>) => void;
}

export function Step1Info({ data, onChange }: Step1InfoProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className={labelClass} htmlFor="new-trip-name">Nome da viagem</label>
                <input
                    id="new-trip-name"
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                    placeholder="Ex: Praia em janeiro"
                    className={inputClass}
                />
            </div>

            <div>
                <label className={labelClass} htmlFor="new-trip-destination">Destino</label>
                <LocationAutocomplete
                    id="new-trip-destination"
                    value={data.destination}
                    onChange={(value, coords) =>
                        onChange({
                            destination: value,
                            destinationLat: coords?.lat,
                            destinationLng: coords?.lng,
                        })
                    }
                    placeholder="Ex: Florianópolis, SC"
                />
            </div>

            <div>
                <p className={labelClass}>Ou escolha um tipo de destino</p>
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
                    <label className={labelClass} htmlFor="new-trip-start">Data de início</label>
                    <input
                        id="new-trip-start"
                        type="date"
                        value={data.startDate}
                        onChange={(e) => onChange({ startDate: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass} htmlFor="new-trip-end">Data de fim</label>
                    <input
                        id="new-trip-end"
                        type="date"
                        value={data.endDate}
                        onChange={(e) => onChange({ endDate: e.target.value })}
                        min={data.startDate || undefined}
                        className={inputClass}
                    />
                </div>
            </div>
        </div>
    );
}