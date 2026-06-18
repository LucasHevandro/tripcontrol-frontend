import { GlobalNavbar } from "@/components/global-navbar";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
            <GlobalNavbar />

            <main className="px-6 py-8">
                {/* Dados do usuário, preferências, etc. entram aqui */}
            </main>
        </div>
    );
}