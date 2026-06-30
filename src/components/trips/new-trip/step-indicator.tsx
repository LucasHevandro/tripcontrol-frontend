import { Check } from "lucide-react";

const STEPS = [
    { number: 1, label: "Informações" },
    { number: 2, label: "Detalhes" },
    { number: 3, label: "Revisão" },
];

interface StepIndicatorProps {
    currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="flex items-center">
            {STEPS.map((step, index) => {
                const isCompleted = step.number < currentStep;
                const isCurrent = step.number === currentStep;
                const isLast = index === STEPS.length - 1;

                return (
                    <div key={step.number} className="flex items-center">
                        <div className="flex items-center gap-2">
                            <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isCompleted || isCurrent
                                        ? "bg-emerald-600 text-white"
                                        : "bg-neutral-100 text-neutral-400"
                                    }`}
                            >
                                {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
                            </span>
                            <span
                                className={`text-sm ${isCompleted || isCurrent
                                        ? "font-medium text-neutral-900"
                                        : "text-neutral-400"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {!isLast && (
                            <div
                                className={`mx-3 h-px w-12 ${isCompleted ? "bg-emerald-600" : "bg-neutral-200"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}