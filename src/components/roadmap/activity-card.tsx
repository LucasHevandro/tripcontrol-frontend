"use client";

import { useState } from "react";
import { Clock, MapPin, Wallet, Pencil, Trash2 } from "lucide-react";
import type { RoadmapActivity } from "@/types/trip";
import { useDeleteActivity } from "@/hooks/roadmap/use-roadmap";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { NewActivityModal } from "./new-activity-modal";

const BADGE_STYLE: Record<string, string> = {
    Concluído: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Agora: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

interface ActivityCardProps {
    tripId: string;
    activity: RoadmapActivity;
}

export function ActivityCard({ tripId, activity }: ActivityCardProps) {
    const deleteActivity = useDeleteActivity(tripId);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleDelete() {
        deleteActivity.mutate(activity.id, {
            onSuccess: () => setConfirmDelete(false),
        });
    }

    return (
        <>
            <div className="group rounded-lg border border-neutral-100 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        <span className="mr-1">{activity.emoji}</span>
                        {activity.title}
                    </p>
                    <div className="flex items-center gap-1">
                        {activity.badge && (
                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE_STYLE[activity.badge] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"}`}>
                                {activity.badge}
                            </span>
                        )}
                        {/* Ações — aparecem no hover */}
                        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                aria-label={`Editar atividade ${activity.title}`}
                                className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                            >
                                <Pencil className="h-3 w-3" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(true)}
                                aria-label={`Excluir atividade ${activity.title}`}
                                className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-rose-100 hover:text-rose-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                        <Clock className="h-3 w-3" />
                        {activity.duration}
                    </span>
                    {activity.location && (
                        <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                        </span>
                    )}
                    {activity.costLabel && (
                        <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                            <Wallet className="h-3 w-3" />
                            {activity.costLabel}
                        </span>
                    )}
                </div>

                {activity.note && (
                    <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{activity.note}</p>
                )}
            </div>

            {isEditing && (
                <NewActivityModal
                    tripId={tripId}
                    editingActivity={activity}
                    onClose={() => setIsEditing(false)}
                />
            )}

            <ConfirmDialog
                open={confirmDelete}
                title="Excluir atividade"
                message={`Tem certeza que deseja excluir "${activity.title}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Excluir"
                variant="danger"
                isLoading={deleteActivity.isPending}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
            />
        </>
    );
}
