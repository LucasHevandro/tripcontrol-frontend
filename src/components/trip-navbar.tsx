"use client";

import { AppHeader, type HeaderNavItem } from "@/components/ui/app-header";
import { TripBottomBar, TRIP_NAV_ITEMS, type TripTab } from "./trip-bottom-bar";

export type { TripTab };

interface TripNavbarProps {
    tripId: string;
    activeTab?: TripTab;
}

export function TripNavbar({ tripId, activeTab }: TripNavbarProps) {
    const navItems: HeaderNavItem[] = TRIP_NAV_ITEMS.map((item) => ({
        key: item.key,
        label: item.label,
        href: `/trips/${tripId}/${item.path}`,
    }));

    return (
        <>
            <AppHeader navItems={navItems} activeKey={activeTab} />
            <TripBottomBar tripId={tripId} activeTab={activeTab} />
        </>
    );
}