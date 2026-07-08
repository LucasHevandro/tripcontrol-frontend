import { GlobalNavbar } from "@/components/global-navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f7f6f1] dark:bg-neutral-950">
            <GlobalNavbar />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
        </div>
    );
}