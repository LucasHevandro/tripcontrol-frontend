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
import { PaymentsHistory } from "@/components/finances/payments-history";
import { FileDown } from "lucide-react";
import { useDownloadReport } from "@/hooks/expenses/use-report";
import { Button } from "@/components/ui/button";

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
    const hasPendingSettlements = settlements.length > 0;
    const isOverBudget = !!summary?.budget && summary.budget > 0 && summary.totalSpent > summary.budget;

    const groupBalanceLabel = isOverBudget ? "Estourado" : hasPendingSettlements ? "Pendente" : "Equilibrado";
    const groupBalanceSublabel = isOverBudget
        ? `${formatCurrencyBRL(summary!.totalSpent - summary!.budget)} acima do orçamento`
        : hasPendingSettlements
            ? `${settlements.length} acerto${settlements.length > 1 ? "s" : ""} pendente${settlements.length > 1 ? "s" : ""}`
            : "acertos calculados";
    const groupBalanceTone = isOverBudget
        ? "text-rose-600 dark:text-rose-400"
        : hasPendingSettlements
            ? "text-amber-600 dark:text-amber-400"
            : "text-emerald-600 dark:text-emerald-400";
    const { user } = useUser();
    const report = useDownloadReport(tripId, summary?.tripName ?? "viagem");

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
                action={
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="secondary"
                            leftIcon={FileDown}
                            onClick={report.download}
                            isLoading={report.isDownloading}
                        >
                            <span className="hidden sm:inline">Baixar relatório</span>
                        </Button>
                        <ExpenseTrigger tripId={tripId} variant="button" label="Nova despesa" />
                    </div>
                }
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
                    value={groupBalanceLabel}
                    sublabel={groupBalanceSublabel}
                    valueClassName={groupBalanceTone}
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
                    <PaymentsHistory tripId={tripId} />
                </Card>
            </div>
        </div>
    );
}