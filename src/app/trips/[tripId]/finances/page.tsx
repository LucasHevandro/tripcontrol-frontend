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
    const { data: summary, isLoading: loadingSummary } = useExpenseSummary(tripId);
    const { data: expensesData, isLoading: loadingExpenses } = useExpenses(tripId);
    const { data: participantsData } = useParticipants(tripId);

    if (loadingSummary || loadingExpenses) return <FinancesSkeleton />;

    const settlements = participantsData?.settlementSummary ?? [];
    const participants = participantsData?.participants ?? [];

    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-neutral-900">
                        Controle financeiro
                    </h1>
                    <p className="text-sm text-neutral-400">
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
                    valueClassName="text-emerald-600"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
                <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-5">
                    <ExpensesTable expenses={expensesData?.data ?? []} />
                    <CategoryBreakdownList categories={summary?.categoryBreakdown ?? []} />
                </div>

                <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5">
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