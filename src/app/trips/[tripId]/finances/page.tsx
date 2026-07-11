"use client";

import { use } from "react";
import { formatCurrencyBRL } from "@/lib/format";
import { useExpenses, useExpenseSummary } from "@/hooks/expenses/use-expenses";
import { FinanceStatCard } from "@/components/finances/finance-stat-card";
import { ExpensesTable } from "@/components/finances/expenses-table";
import { CategoryBreakdownList } from "@/components/finances/category-breakdown";
import { SettlementsList } from "@/components/finances/settlements-list";
import { IndividualBalances } from "@/components/finances/individual-balances";
import { ExpenseTrigger } from "@/components/expenses/expense-trigger";
import { FinancesSkeleton } from "@/components/finances/finances-skeleton";
import { useParticipants } from "@/hooks/participants/use-participants";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { useUser } from "@/contexts/user-context";

export default function FinancesPage({
    params,
}: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = use(params);
    const { data: summary, isLoading: loadingSummary, isRefetching: refetchingSummary, isError, refetch: refetchSummary } = useExpenseSummary(tripId);
    const { data: expensesData, isLoading: loadingExpenses } = useExpenses(tripId);
    const { data: participantsData } = useParticipants(tripId);
    const settlements = participantsData?.settlementSummary ?? [];
    const participants = participantsData?.participants ?? [];
    const { user } = useUser();

    if (loadingSummary || loadingExpenses) return <FinancesSkeleton />;

    if (isError) return (
        <ErrorState
            title="Não foi possível carregar as finanças"
            description="Verifique sua conexão e tente novamente."
            onRetry={() => refetchSummary()}
            isRetrying={refetchingSummary}
            className="mt-6"
        />
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Controle financeiro"
                subtitle={`${summary?.tripName} · ${summary?.tripPeriod}`}
                action={<ExpenseTrigger tripId={tripId} variant="button" label="Nova despesa" />}
            />

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
                <Card padding="lg" className="space-y-6">
                    <ExpensesTable tripId={tripId} expenses={expensesData?.data ?? []} />
                    <CategoryBreakdownList categories={summary?.categoryBreakdown ?? []} />
                </Card>

                <Card padding="lg" className="space-y-4">
                    <SettlementsList
                        settlements={settlements}
                        perPersonAverage={summary?.perPersonAverage ?? 0}
                        currentUserId={user?.id ?? ""}
                        tripId={tripId}
                    />
                    <IndividualBalances
                        participants={participants.map((p) => ({
                            id: p.id,
                            name: p.name,
                            balance: p.balance,
                        }))}
                    />
                </Card>
            </div>
        </div>
    );
}