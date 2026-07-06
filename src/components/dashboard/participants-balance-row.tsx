import { Users } from "lucide-react";
import type { TripParticipant } from "@/types/trip";
import { getInitials } from "@/lib/get-initials";
import { getAvatarColor } from "@/lib/avatar-color";
import { formatBalance } from "@/lib/format";

interface ParticipantsBalanceRowProps {
    participants: TripParticipant[];
}

export function ParticipantsBalanceRow({ participants }: ParticipantsBalanceRowProps) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                <Users className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                Participantes e acertos
            </h2>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {participants.map((participant) => {
                    const color = getAvatarColor(participant.id);
                    const isPositive = participant.balance >= 0;
                    return (
                        <div
                            key={participant.id}
                            className="flex items-center gap-2.5 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800"
                        >
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${color.bg} ${color.text}`}
                            >
                                {getInitials(participant.name)}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {participant.name}
                                </p>
                                <p className={`text-xs font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                    {formatBalance(participant.balance)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}