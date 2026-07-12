import { formatCurrencyBRL } from "../../lib/format.ts";
import type {
    CostType,
    CreateActivityPayload,
} from "../../core/domain/roadmap/roadmap.types";
import type { NewActivityFormData, RoadmapActivity } from "../../types/trip";

export const COST_TYPE_OPTIONS: { value: NewActivityFormData["costType"]; label: string }[] = [
    { value: "free", label: "Gratuito" },
    { value: "total", label: "Total do grupo" },
    { value: "per_person", label: "Por pessoa" },
];

export function getTodayISO() {
    return new Date().toISOString().split("T")[0];
}

export function getInitialActivityForm(
    editingActivity?: RoadmapActivity | null,
    defaultDate?: string,
): NewActivityFormData {
    return {
        emoji: editingActivity?.emoji ?? "🎯",
        title: editingActivity?.title ?? "",
        date: editingActivity?.date ?? defaultDate ?? getTodayISO(),
        startTime: editingActivity?.startTime ?? editingActivity?.time ?? "",
        duration: editingActivity?.duration || "1h",
        location: editingActivity?.location ?? "",
        costAmount:
            editingActivity?.costAmount != null
                ? String(editingActivity.costAmount)
                : "",
        costType:
            (editingActivity?.costType?.toLowerCase() as NewActivityFormData["costType"]) ??
            "free",
        note: editingActivity?.note ?? "",
    };
}

export function isActivityFormValid(form: NewActivityFormData): boolean {
    return form.title.trim() !== "" && form.startTime !== "";
}

export function getActivityCostPreview(form: NewActivityFormData): string | null {
    if (form.costType === "free") return "Gratuito";
    if (!form.costAmount) return null;
    return `${formatCurrencyBRL(Number(form.costAmount))}${form.costType === "per_person" ? "/pessoa" : " total"}`;
}

export function buildActivityPayload(form: NewActivityFormData): CreateActivityPayload {
    return {
        emoji: form.emoji,
        title: form.title,
        date: form.date,
        startTime: form.startTime,
        duration: form.duration || undefined,
        location: form.location || undefined,
        costAmount: form.costType !== "free" && form.costAmount
            ? Number(form.costAmount)
            : undefined,
        costType: form.costType.toUpperCase() as CostType,
        note: form.note || undefined,
    };
}
