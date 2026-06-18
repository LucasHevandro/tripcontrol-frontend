export default async function RoadmapPage({ params }: { params: Promise<{ tripId: string }> }) {
    const { tripId } = await params;
    return (
        <div className="min-h-screen bg-[#f7f6f1]">
        </div>
    );
}