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
        <div className="min-h-screen bg-[#f7f6f1] dark:bg-neutral-950">
            <TripNavbar tripId={tripId} />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
        </div>
    );
}