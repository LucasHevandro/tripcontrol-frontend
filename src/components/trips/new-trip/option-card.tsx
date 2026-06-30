import type { LucideIcon } from "lucide-react";

interface OptionCardProps {
    label: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    isSelected: boolean;
    onClick: () => void;
}

export function OptionCard({
    label,
    icon: Icon,
    iconBg,
    iconColor,
    isSelected,
    onClick,
}: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${isSelected
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
        >
            <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
            >
                <Icon className="h-5 w-5" />
            </span>
            <span
                className={`text-sm ${isSelected ? "font-medium text-emerald-700" : "text-neutral-600"
                    }`}
            >
                {label}
            </span>
        </button>
    );
}