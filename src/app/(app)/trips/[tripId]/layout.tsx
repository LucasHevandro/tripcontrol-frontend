import { TripNavbar } from "@/components/trip-navbar";

export default async function TripLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;

    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <TripNavbar tripId={tripId} />
            <main className="px-12 py-8 max-w-7xl mx-auto">{children}</main>
        </div>
    );
}