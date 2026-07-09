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
        <div className="min-h-screen">
            <TripNavbar tripId={tripId} />
            <main className="pb-24 md:pb-0">
                <PageContainer>{children}</PageContainer>
            </main>
        </div>
    );
}