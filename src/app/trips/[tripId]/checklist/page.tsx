import { TripNavbar } from "@/components/trip-navbar";

export default async function ChecklistPage({ params }: { params: Promise<{ tripId: string }> }) {
    const { tripId } = await params;
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <TripNavbar tripId={tripId} activeTab="checklist" />

            <main className="px-6 py-8">
                {/* Lista de cards de viagens (Florianópolis, Serra Gaúcha, etc.) entra aqui */}
            </main>
        </div>
    );
}