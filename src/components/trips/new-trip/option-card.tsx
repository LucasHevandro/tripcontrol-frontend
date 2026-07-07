import type { LucideIcon } from "lucide-react";

interface OptionCardProps {
    label: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    isSelected: boolean;
    onClick: () => void;
}

export function OptionCard({ label, icon: Icon, iconBg, iconColor, isSelected, onClick }: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${isSelected
                    ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950"
                    : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                }`}
        >
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                <Icon className="h-5 w-5" />
            </span>
            <span className={`text-sm ${isSelected ? "font-medium text-emerald-700 dark:text-emerald-400" : "text-neutral-600 dark:text-neutral-400"}`}>
                {label}
            </span>
        </button>
    );
}