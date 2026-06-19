import { getAvatarColor } from "@/lib/avatar-color";
import { getInitials } from "@/lib/get-initials";
import { formatBalance } from "@/lib/format";
import type { TripParticipant } from "@/types/trip";

interface IndividualBalancesProps {
    participants: TripParticipant[];
}

export function IndividualBalances({ participants }: IndividualBalancesProps) {
    return (
        <div className="rounded-lg bg-neutral-50 p-4">
            <h3 className="text-sm font-semibold text-neutral-900">Saldo individual</h3>

            <ul className="mt-3 space-y-3">
                {participants.map((p) => {
                    const color = getAvatarColor(p.id);
                    const isPositive = p.balance >= 0;
                    return (
                        <li key={p.id} className="flex items-center gap-3">
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${color.bg} ${color.text}`}
                            >
                                {getInitials(p.name)}
                            </span>
                            <span className="flex-1 text-sm text-neutral-700">{p.name}</span>
                            <span
                                className={`text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-rose-600"
                                    }`}
                            >
                                {formatBalance(p.balance)}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}