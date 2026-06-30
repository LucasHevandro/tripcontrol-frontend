"use client";

import { useState, useEffect, useRef } from "react";
import { X, Sparkles } from "lucide-react";
import { StepIndicator } from "./step-indicator";
import { Step1Info } from "./step-1-info";
import { Step2Details } from "./step-2-details";
import { Step3Review } from "./step-3-review";
import type { NewTripFormData } from "@/types/trip";

const INITIAL_DATA: NewTripFormData = {
    name: "",
    destination: "",
    destinationType: null,
    startDate: "",
    endDate: "",
    tripType: null,
    budget: "",
    description: "",
};

interface NewTripModalProps {
    onClose: () => void;
}

export function NewTripModal({ onClose }: NewTripModalProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<NewTripFormData>(INITIAL_DATA);
    const modalRef = useRef<HTMLDivElement>(null);

    function updateData(updates: Partial<NewTripFormData>) {
        setData((prev) => ({ ...prev, ...updates }));
    }

    // Fecha com Esc
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Bloqueia scroll do body enquanto o modal está aberto
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    function handleOverlayClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) onClose();
    }

    const isStep1Valid =
        data.name.trim() !== "" &&
        data.destination.trim() !== "" &&
        data.startDate !== "" &&
        data.endDate !== "";

    function handleNext() {
        if (step === 1 && !isStep1Valid) return;
        setStep((s) => Math.min(s + 1, 3));
    }

    function handleBack() {
        setStep((s) => Math.max(s - 1, 1));
    }

    function handleCreate() {
        // TODO: quando a API existir → POST /trips { ...payload }
        console.log("Criar viagem:", {
            ...data,
            budget: Number(data.budget) || 0,
        });
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-3 py-6 sm:px-4 sm:py-10"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Criar nova viagem"
                className="w-full max-w-[520px] rounded-xl bg-white shadow-xl"
            >
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3.5 sm:px-6 sm:py-4">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                        <Sparkles className="h-4 w-4" />
                        Criar nova viagem
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                        aria-label="Fechar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="border-b border-neutral-100 px-4 py-3.5 sm:px-6 sm:py-4">
                    <StepIndicator currentStep={step} />
                </div>

                <div className="px-4 py-4 sm:px-6 sm:py-5">
                    {step === 1 && <Step1Info data={data} onChange={updateData} />}
                    {step === 2 && <Step2Details data={data} onChange={updateData} />}
                    {step === 3 && <Step3Review data={data} />}
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3.5 sm:px-6 sm:py-4">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                            ← Voltar
                        </button>
                    ) : (
                        <span />
                    )}

                    <span className="hidden text-sm text-neutral-400 sm:inline">Passo {step} de 3</span>

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={step === 1 && !isStep1Valid}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Próximo →
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleCreate}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            ✓ Criar viagem
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}