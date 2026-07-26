"use client";

import { useState } from "react";
import { useToast } from "@/contexts/toast-context";
import { apiClient } from "@/infrastructure/http/api-client";

export function useDownloadReport(tripId: string, tripName: string) {
    const [isDownloading, setIsDownloading] = useState(false);
    const { addToast } = useToast();

    async function download() {
        setIsDownloading(true);
        try {
            const response = await apiClient.get(`/trips/${tripId}/report/pdf`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const safeName = tripName.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase();
            link.download = `tripcontrol-${safeName}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            addToast("Relatório baixado");
        } catch {
            addToast("Erro ao gerar relatório", "error");
        } finally {
            setIsDownloading(false);
        }
    }

    return { download, isDownloading };
}