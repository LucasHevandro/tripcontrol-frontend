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
        const updated = { ...notifications, [key]: newValue };
        setNotifications(updated);
        updatePreferences.mutate({ [key]: newValue });
    }

    function handleLanguageChange(value: string) {
        setLanguage(value);
        updatePreferences.mutate({ language: value });
    }

    function handleCurrencyChange(value: string) {
        setCurrency(value);
        // TODO: PATCH /users/me/preferences { currency: value }
    }

    return (
        <div className="space-y-5">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Idioma
                </label>
                <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    {LANGUAGES.map((l) => (
                        <option key={l.value} value={l.value}>
                            {l.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Moeda padrão
                </label>
                <select
                    value={currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    {CURRENCIES.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <p className="mb-2 text-sm font-medium text-neutral-700">Notificações</p>
                <div className="space-y-3">
                    {TOGGLES.map((toggle) => {
                        const isOn = notifications[toggle.key];
                        return (
                            <div key={toggle.key} className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-neutral-900">{toggle.label}</p>
                                    <p className="text-xs text-neutral-400">{toggle.description}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleNotification(toggle.key)}
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${isOn ? "bg-emerald-600" : "bg-neutral-200"
                                        }`}
                                    role="switch"
                                    aria-checked={isOn}
                                    aria-label={toggle.label}
                                >
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-[22px]" : "translate-x-0.5"
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