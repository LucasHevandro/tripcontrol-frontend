// src/app/(app)/layout.tsx
import { GlobalNavbar } from "@/components/global-navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <GlobalNavbar />
            <main className="px-6 py-8">{children}</main>
        </div>
    );
}