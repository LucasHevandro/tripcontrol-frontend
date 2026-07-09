import Link from "next/link";
import { Sparkles, MapPin, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <Link href="/trips" className="mb-12 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
                <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">TripControl</span>
            </Link>

            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
                <MapPin className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Página não encontrada
            </h1>
            <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
                A página que você está procurando não existe ou foi movida.
                Verifique o endereço ou volte para suas viagens.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Link
                    href="/trips"
                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Minhas viagens
                </Link>
                <Link
                    href="/login"
                    className="text-sm font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                    Ir para o login
                </Link>
            </div>

            <p className="mt-12 text-xs text-neutral-300 dark:text-neutral-600">Erro 404</p>
        </div>
    );
}