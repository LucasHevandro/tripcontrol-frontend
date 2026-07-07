import {
    BedDouble,
    UtensilsCrossed,
    Car,
    Sailboat,
    ShoppingCart,
    MoreHorizontal,
    type LucideIcon,
} from "lucide-react";
import type { ExpenseCategory } from "@/types/trip";

export const EXPENSE_CATEGORIES: {
    value: ExpenseCategory;
    label: string;
    icon: LucideIcon;
}[] = [
        { value: "Hospedagem", label: "Hospedagem", icon: BedDouble },
        { value: "Alimentação", label: "Alimentação", icon: UtensilsCrossed },
        { value: "Transporte", label: "Transporte", icon: Car },
        { value: "Lazer", label: "Lazer", icon: Sailboat },
        { value: "Compras", label: "Compras", icon: ShoppingCart },
        { value: "Outro", label: "Outro", icon: MoreHorizontal },
    ];