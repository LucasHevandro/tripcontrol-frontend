"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const OPTIONS = [
        { value: "light" as const, icon: Sun, label: "Claro" },
        { value: "dark" as const, icon: Moon, label: "Escuro" },
        { value: "system" as const, icon: Monitor, label: "Sistema" },
    ];

    return (
        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
            {OPTIONS.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => setTheme(value)}
                    title={label}
                    aria-label={`Tema ${label}`}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${theme === value
                            ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-100"
                            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                        }`}
                >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
}