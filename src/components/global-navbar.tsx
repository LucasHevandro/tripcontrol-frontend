"use client";

import { AppHeader, type HeaderNavItem } from "@/components/ui/app-header";

const GLOBAL_NAV_ITEMS: HeaderNavItem[] = [
    { key: "trips", label: "Viagens", href: "/trips" },
    { key: "profile", label: "Perfil", href: "/profile" },
];

export function GlobalNavbar() {
    return <AppHeader navItems={GLOBAL_NAV_ITEMS} showNavOnMobile />;
}