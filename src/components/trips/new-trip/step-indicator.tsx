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
        <div className="flex items-center justify-between sm:justify-start">
            {STEPS.map((step, index) => {
                const isCompleted = step.number < currentStep;
                const isCurrent = step.number === currentStep;
                const isLast = index === STEPS.length - 1;

                return (
                    <div key={step.number} className="flex flex-1 items-center sm:flex-initial">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isCompleted || isCurrent
                                        ? "bg-emerald-600 text-white"
                                        : "bg-neutral-100 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500"
                                    }`}
                            >
                                {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
                            </span>
                            <span
                                className={`hidden text-sm sm:inline ${isCompleted || isCurrent
                                        ? "font-medium text-neutral-900 dark:text-neutral-100"
                                        : "text-neutral-400 dark:text-neutral-500"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {!isLast && (
                            <div
                                className={`mx-2 h-px flex-1 sm:mx-3 sm:w-12 sm:flex-initial ${isCompleted ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-700"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}