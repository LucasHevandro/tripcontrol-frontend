import Link from "next/link";
import { Check } from "lucide-react";
import type { OnboardingStep } from "@/lib/onboarding";

interface OnboardingChecklistProps {
    steps: OnboardingStep[];
}

export function OnboardingChecklist({ steps }: OnboardingChecklistProps) {
    const completedCount = steps.filter((s) => s.completed).length;
    const progressPercentage = (completedCount / steps.length) * 100;

    return (
        <div className="rounded-xl border border-emerald-100 bg-white p-5">
            <h2 className="font-semibold text-neutral-900">
                Boas-vindas à sua nova viagem!
            </h2>
            <p className="mt-0.5 text-sm text-neutral-500">
                Siga os passos abaixo para começar o planejamento
            </p>

            <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <div
                        className="h-full rounded-full bg-emerald-600 transition-all"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <span className="shrink-0 text-xs text-neutral-400">
                    {completedCount} de {steps.length} concluídos
                </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="rounded-lg border border-neutral-100 bg-neutral-50 p-3.5"
                    >
                        <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${step.completed
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white text-neutral-400 ring-1 ring-neutral-200"
                                }`}
                        >
                            {step.completed ? <Check className="h-3.5 w-3.5" /> : step.number}
                        </span>

                        <p
                            className={`mt-2.5 text-sm font-medium ${step.completed ? "text-neutral-400 line-through" : "text-neutral-900"
                                }`}
                        >
                            {step.title}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-400">{step.subtitle}</p>

                        {!step.completed && step.actionHref && (
                            <Link
                                href={step.actionHref}
                                className="mt-2 inline-block text-xs font-medium text-emerald-700 hover:text-emerald-800"
                            >
                                → {step.actionLabel}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}