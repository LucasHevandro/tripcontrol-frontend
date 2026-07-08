"use client";

import { useState } from "react";
import { Sparkles, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { StepIndicator } from "./step-indicator";
import { Step1Info } from "./step-1-info";
import { Step2Details } from "./step-2-details";
import { Step3Review } from "./step-3-review";
import type { NewTripFormData } from "@/types/trip";
import { useCreateTrip } from "@/hooks/trips/use-trips";
import { toUpperEnum } from "@/lib/utils";
import type { DestinationType, TripType } from "@/core/domain/trip/trip.types";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


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
    const createTrip = useCreateTrip();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<NewTripFormData>(INITIAL_DATA);

    function updateData(updates: Partial<NewTripFormData>) {
        setData((prev) => ({ ...prev, ...updates }));
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
        createTrip.mutate({
            name: data.name,
            destination: data.destination,
            destinationType: data.destinationType ? toUpperEnum<DestinationType>(data.destinationType) : undefined,
            startDate: data.startDate,
            endDate: data.endDate,
            tripType: data.tripType ? toUpperEnum<TripType>(data.tripType) : undefined,
            budget: data.budget ? Number(data.budget) : undefined,
            description: data.description || undefined,
            emoji:
                data.destinationType === "beach" ? "🏖️"
                    : data.destinationType === "countryside" ? "🏔️"
                        : data.destinationType === "city" ? "🌆"
                            : "✈️",
        });
    }

    return (
        <Dialog
            open
            onClose={onClose}
            ariaLabel="Criar nova viagem"
            size="lg"
            mobileSheet
        >
            <DialogHeader
                title="Criar nova viagem"
                icon={<Sparkles className="h-4 w-4" />}
                onClose={onClose}
            />

            {/* Barra de progresso do wizard — fixa entre header e body */}
            <div className="shrink-0 border-b border-neutral-100 px-4 py-3.5 dark:border-neutral-800 sm:px-6 sm:py-4">
                <StepIndicator currentStep={step} />
            </div>

            <DialogBody className="sm:px-6">
                {step === 1 && <Step1Info data={data} onChange={updateData} />}
                {step === 2 && <Step2Details data={data} onChange={updateData} />}
                {step === 3 && <Step3Review data={data} />}
            </DialogBody>

            <DialogFooter className="justify-between">
                {step > 1 ? (
                    <Button variant="secondary" leftIcon={ArrowLeft} onClick={handleBack}>
                        Voltar
                    </Button>
                ) : (
                    <span />
                )}

                <span className="hidden text-sm text-neutral-500 dark:text-neutral-400 sm:inline">
                    Passo {step} de 3
                </span>

                {step < 3 ? (
                    <Button
                        onClick={handleNext}
                        disabled={step === 1 && !isStep1Valid}
                        rightIcon={ArrowRight}
                    >
                        Próximo
                    </Button>
                ) : (
                    <Button
                        onClick={handleCreate}
                        isLoading={createTrip.isPending}
                        leftIcon={Check}
                    >
                        {createTrip.isPending ? "Criando..." : "Criar viagem"}
                    </Button>
                )}
            </DialogFooter>
        </Dialog>
    );
}