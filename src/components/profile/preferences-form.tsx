"use client";

import { useState } from "react";
import type { UserProfile } from "@/core/domain/user/user.types";
import { useUpdatePreferences } from "@/hooks/user/use-user-profile";

const LANGUAGES = [
    { value: "pt-BR", label: "Português (Brasil)" },
    { value: "en-US", label: "English (US)" },
    { value: "es-ES", label: "Español" },
];

const CURRENCIES = [
    { value: "BRL", label: "Real (R$)" },
    { value: "USD", label: "Dólar (US$)" },
    { value: "EUR", label: "Euro (€)" },
];

interface Toggle {
    key: "notifyEmail" | "notifyExpenseAlerts" | "notifyRoadmapReminders";
    label: string;
    description: string;
}

const TOGGLES: Toggle[] = [
    { key: "notifyEmail", label: "Notificações por e-mail", description: "Receber resumos e avisos importantes" },
    { key: "notifyExpenseAlerts", label: "Alertas de despesas", description: "Quando alguém registra um novo gasto" },
    { key: "notifyRoadmapReminders", label: "Lembretes de roteiro", description: "Avisos sobre atividades programadas" },
];

const selectClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

interface PreferencesFormProps {
    profile: UserProfile;
}

export function PreferencesForm({ profile }: PreferencesFormProps) {
    const [language, setLanguage] = useState(profile.language);
    const [currency, setCurrency] = useState(profile.currency);
    const [notifications, setNotifications] = useState({
        notifyEmail: profile.notifyEmail,
        notifyExpenseAlerts: profile.notifyExpenseAlerts,
        notifyRoadmapReminders: profile.notifyRoadmapReminders,
    });
    const updatePreferences = useUpdatePreferences();

    function toggleNotification(key: Toggle["key"]) {
        const newValue = !notifications[key];
        setNotifications((prev) => ({ ...prev, [key]: newValue }));
        updatePreferences.mutate({ [key]: newValue });
    }

    function handleLanguageChange(value: string) {
        setLanguage(value);
        updatePreferences.mutate({ language: value });
    }

    function handleCurrencyChange(value: string) {
        setCurrency(value);
        updatePreferences.mutate({ currency: value });
    }

    return (
        <div className="space-y-5">
            <div>
                <label className={labelClass}>Idioma</label>
                <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className={selectClass}
                >
                    {LANGUAGES.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className={labelClass}>Moeda padrão</label>
                <select
                    value={currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className={selectClass}
                >
                    {CURRENCIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <p className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Notificações
                </p>
                <div className="space-y-4">
                    {TOGGLES.map((toggle) => {
                        const isOn = notifications[toggle.key];
                        return (
                            <div key={toggle.key} className="flex items-center justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {toggle.label}
                                    </p>
                                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                                        {toggle.description}
                                    </p>
                                </div>

                                {/* Toggle switch */}
                                <button
                                    type="button"
                                    onClick={() => toggleNotification(toggle.key)}
                                    role="switch"
                                    aria-checked={isOn}
                                    aria-label={toggle.label}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${isOn ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-700"
                                        }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isOn ? "translate-x-5" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}