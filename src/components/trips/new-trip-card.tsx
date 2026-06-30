import Link from "next/link";
import { Plus } from "lucide-react";

export function NewTripCard() {
    return (
        <Link
            href="/trips/new"
            className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-white transition-colors hover:border-neutral-300 hover:bg-neutral-50"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 text-neutral-400">
                <Plus className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-neutral-600">Nova viagem</p>
            <p className="text-xs text-neutral-400">Criar um novo planejamento</p>
        </Link>
    );
}