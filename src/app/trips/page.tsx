import { GlobalNavbar } from "@/components/global-navbar";

export default function MyTripsPage() {
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <GlobalNavbar />

            <main className="px-6 py-8">
                {/* Lista de cards de viagens (Florianópolis, Serra Gaúcha, etc.) entra aqui */}
            </main>
        </div>
    );
}