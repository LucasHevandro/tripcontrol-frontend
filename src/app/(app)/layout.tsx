import { GlobalNavbar } from "@/components/global-navbar";
import { PageContainer } from "@/components/ui/page-container";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <GlobalNavbar />
            <main><PageContainer>{children}</PageContainer></main>
        </div>
    );
}