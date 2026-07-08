import { TripNavbar } from "@/components/trip-navbar";
import { PageContainer } from "@/components/ui/page-container";

export default async function TripLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;

    return (
        <div className="min-h-screen bg-[#f7f6f1] dark:bg-neutral-950">
            <TripNavbar tripId={tripId} />
            <main><PageContainer>{children}</PageContainer></main>
        </div>
    );
}