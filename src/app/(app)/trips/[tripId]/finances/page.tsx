import Link from "next/link";
import { Plus } from "lucide-react";
import { getTripFinancesMock } from "@/lib/mock-trip";
import { formatCurrencyBRL } from "@/lib/format";
import { FinanceStatCard } from "@/components/finances/finance-start-card";
import { ExpensesTable } from "@/components/finances/expenses-table";
import { CategoryBreakdownList } from "@/components/finances/category-breakdown";
import { SettlementsList } from "@/components/finances/settlements-list";
import { IndividualBalances } from "@/components/finances/individual-balances";

export default async function FinancesPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;
    const data = getTripFinancesMock(tripId);

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">
                        Controle financeiro
                    </h1>
                    <p className="text-sm text-neutral-400">
                        {data.tripName} · {data.tripPeriod}
                    </p>
                </div>
                <Link
                    href={`/trips/${tripId}/finances/new`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Nova despesa
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <FinanceStatCard
                    label="Total gasto"
                    value={formatCurrencyBRL(data.totalSpent)}
                    sublabel={`${data.expenseCount} despesas`}
                />
                <FinanceStatCard
                    label="Por pessoa (média)"
                    value={formatCurrencyBRL(data.perPersonAverage)}
                    sublabel={`${data.participantCount} participantes`}
                />
                <FinanceStatCard
                    label="Maior despesa"
                    value={formatCurrencyBRL(data.largestExpenseAmount)}
                    sublabel={data.largestExpenseDescription}
                />
                <FinanceStatCard
                    label="Saldo do grupo"
                    value={data.groupBalanceLabel}
                    sublabel="acertos calculados"
                    valueClassName="text-emerald-600"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-5">
                    <ExpensesTable expenses={data.expenses} />
                    <CategoryBreakdownList categories={data.categoryBreakdown} />
                </div>

                <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5">
                    <SettlementsList
                        settlements={data.settlements}
                        perPersonAverage={data.perPersonAverage}
                    />
                    <IndividualBalances participants={data.participants} />
                </div>
            </div>
        </div>
    );
}