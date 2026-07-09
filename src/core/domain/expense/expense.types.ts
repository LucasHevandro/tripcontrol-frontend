export type SplitType = 'EQUAL' | 'CUSTOM' | 'INDIVIDUAL';

export interface Expense {
    id: string;
    description: string;
    category: string;
    amount: number;
    date: string;
    paidById: string;
    paidByName: string;
    splitType: SplitType;
    notes: string | null;
    receiptUrl: string | null;
}

export interface ExpenseSummary {
    tripName: string;
    tripPeriod: string;
    totalSpent: number;
    expenseCount: number;
    perPersonAverage: number;
    participantCount: number;
    largestExpenseAmount: number;
    largestExpenseDescription: string;
    groupBalanceLabel: string;
    categoryBreakdown: {
        category: string;
        total: number;
        percentage: number;
    }[];
}

export interface CreateExpensePayload {
    description: string;
    amount: number;
    date: string;
    category: string;
    paidById: string;
    splitType?: SplitType;
    splitParticipants?: { participantId: string; amount?: number }[];
    notes?: string;
}

export interface PaginatedExpenses {
    data: Expense[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}