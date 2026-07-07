"use client";

import { use } from "react";
import { formatCurrencyBRL } from "@/lib/format";
import { useExpenses, useExpenseSummary } from "@/hooks/expenses/use-expenses";
import { FinanceStatCard } from "@/components/finances/finance-start-card";
import { ExpensesTable } from "@/components/finances/expenses-table";
import { CategoryBreakdownList } from "@/components/finances/category-breakdown";
import { SettlementsList } from "@/components/finances/settlements-list";
import { IndividualBalances } from "@/components/finances/individual-balances";
import { ExpenseTrigger } from "@/components/expenses/expense-trigger";
import { FinancesSkeleton } from "@/components/finances/finances-skeleton";
import { useParticipants } from "@/hooks/participants/use-participants";

export default function FinancesPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data: summary, isLoading: loadingSummary, isError, refetch: refetchSummary } = useExpenseSummary(tripId);
    const { data: expensesData, isLoading: loadingExpenses } = useExpenses(tripId);
    const { data: participantsData } = useParticipants(tripId);

    if (loadingSummary || loadingExpenses) return <FinancesSkeleton />;

    if (isError) return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Erro ao carregar dados.</p>
            <button
                onClick={() => refetchSummary()}
                className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400"
            >
                Tentar novamente
            </button>
        </div>
    );

    const settlements = participantsData?.settlementSummary ?? [];
    const participants = participantsData?.participants ?? [];

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Controle financeiro
                    </h1>
                    <p className="text-sm text-neutral-400 dark:text-neutral-500">
                        {summary?.tripName} · {summary?.tripPeriod}
                    </p>
                </div>
                <ExpenseTrigger tripId={tripId} variant="button" label="Nova despesa" />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <FinanceStatCard
                    label="Total gasto"
                    value={formatCurrencyBRL(summary?.totalSpent ?? 0)}
                    sublabel={`${summary?.expenseCount ?? 0} despesas`}
                />
                <FinanceStatCard
                    label="Por pessoa (média)"
                    value={formatCurrencyBRL(summary?.perPersonAverage ?? 0)}
                    sublabel={`${summary?.participantCount ?? 0} participantes`}
                />
                <FinanceStatCard
                    label="Maior despesa"
                    value={formatCurrencyBRL(summary?.largestExpenseAmount ?? 0)}
                    sublabel={summary?.largestExpenseDescription ?? ""}
                />
                <FinanceStatCard
                    label="Saldo do grupo"
                    value={summary?.groupBalanceLabel ?? ""}
                    sublabel="acertos calculados"
                    valueClassName="text-emerald-600 dark:text-emerald-400"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                    <ExpensesTable expenses={expensesData?.data ?? []} />
                    <CategoryBreakdownList categories={summary?.categoryBreakdown ?? []} />
                </div>

                <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                    <SettlementsList
                        settlements={settlements}
                        perPersonAverage={summary?.perPersonAverage ?? 0}
                    />
                    <IndividualBalances
                        participants={participants.map((p) => ({
                            id: p.id,
                            name: p.name,
                            balance: p.balance,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}