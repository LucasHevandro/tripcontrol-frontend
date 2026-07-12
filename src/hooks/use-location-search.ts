"use client";

import { useEffect, useRef, useState } from "react";

export interface LocationSuggestion {
    id: string;
    displayName: string;
    shortName: string;
    lat: number;
    lng: number;
    address: {
        city?: string;
        state?: string;
        country?: string;
        countryCode?: string;
    };
}

// Photon retorna GeoJSON
interface PhotonFeature {
    geometry: {
        type: "Point";
        coordinates: [number, number]; // [lon, lat]
    };
    properties: {
        osm_id?: number;
        osm_type?: string;
        name?: string;
        city?: string;
        county?: string;
        state?: string;
        country?: string;
        countrycode?: string;
        type?: string;
        osm_key?: string;
        osm_value?: string;
        postcode?: string;
    };
}

interface PhotonResponse {
    features: PhotonFeature[];
}

function formatShortName(feat: PhotonFeature): string {
    const p = feat.properties;
    // Nome do lugar (cidade, POI, etc.)
    const primary = p.name || p.city || p.county;
    // Estado/país como qualificador
    const secondary =
        (p.state && p.state !== primary && p.state) ||
        (p.country && p.country !== primary && p.country);

    if (primary && secondary) return `${primary}, ${secondary}`;
    if (primary) return primary;
    return "Local desconhecido";
}

function formatDisplayName(feat: PhotonFeature): string {
    const p = feat.properties;
    const parts = [p.name, p.city, p.county, p.state, p.country].filter(
        (v, i, arr) => v && arr.indexOf(v) === i, // dedup
    );
    return parts.join(", ");
}

function mapFeature(feat: PhotonFeature, idx: number): LocationSuggestion {
    const [lng, lat] = feat.geometry.coordinates; // Photon inverte!
    return {
        id: `${feat.properties.osm_type ?? "x"}-${feat.properties.osm_id ?? idx}`,
        displayName: formatDisplayName(feat),
        shortName: formatShortName(feat),
        lat,
        lng,
        address: {
            city: feat.properties.city || feat.properties.name,
            state: feat.properties.state,
            country: feat.properties.country,
            countryCode: feat.properties.countrycode?.toLowerCase(),
        },
    };
}

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 3;
const PHOTON_URL = "https://photon.komoot.io/api/";

export function useLocationSearch(query: string) {
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (abortRef.current) abortRef.current.abort();
        if (timerRef.current) clearTimeout(timerRef.current);

        const trimmed = query.trim();
        if (trimmed.length < MIN_QUERY_LENGTH) {
            setSuggestions([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        timerRef.current = setTimeout(async () => {
            const controller = new AbortController();
            abortRef.current = controller;

            try {
                const params = new URLSearchParams({
                    q: trimmed,
                    limit: "5",
                });

                const res = await fetch(`${PHOTON_URL}?${params.toString()}`, {
                    signal: controller.signal,
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = (await res.json()) as PhotonResponse;
                setSuggestions((data.features ?? []).map(mapFeature));
                setError(null);
            } catch (err) {
                if ((err as Error).name === "AbortError") return;
                setError("Não foi possível buscar locais");
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [query]);

    return { suggestions, isLoading, error };
}