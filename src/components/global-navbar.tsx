"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const GLOBAL_NAV_ITEMS = [
    { label: "Minhas viagens", href: "/trips" },
    { label: "Perfil", href: "/profile" },
];

export function GlobalNavbar({ userInitials = "LH" }: { userInitials?: string }) {
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
            <Link href="/trips" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neutral-900" />
                <span className="text-base font-semibold text-neutral-900">
                    TripControl
                </span>
            </Link>

            <nav className="flex items-center gap-7">
                {GLOBAL_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative pb-1 text-sm transition-colors ${isActive
                                ? "font-medium text-emerald-700"
                                : "text-neutral-400 hover:text-neutral-600"
                                }`}
                        >
                            {item.label}
                            {isActive && (
                                <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-emerald-600" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                {userInitials}
            </div>
        </header>
    );
}