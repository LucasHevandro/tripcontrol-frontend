<<<<<<< HEAD
=======

>>>>>>> origin/main
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
<<<<<<< HEAD
        <div className="min-h-screen bg-[#f7f6f1] dark:bg-neutral-950">
            <TripNavbar tripId={tripId} />
            <main className="mx-auto max-w-7xl px-12 py-8">{children}</main>
=======
        <div className="min-h-screen bg-[#f7f6f1]">
            <TripNavbar tripId={tripId} />
            <main className="px-6 py-8">{children}</main>
>>>>>>> origin/main
        </div>
    );
}