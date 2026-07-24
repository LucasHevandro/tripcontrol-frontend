"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useLocationSearch, type LocationSuggestion } from "@/hooks/use-location-search";

interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string, coords?: { lat: number; lng: number }) => void;
    placeholder?: string;
    className?: string;
    id?: string;
}

export function LocationAutocomplete({
    value,
    onChange,
    placeholder,
    className,
    id,
}: LocationAutocompleteProps) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const listboxId = `${inputId}-listbox`;

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [pristine, setPristine] = useState(true); // não busca até usuário digitar
    const containerRef = useRef<HTMLDivElement>(null);

    const { suggestions, isLoading, error } = useLocationSearch(pristine ? "" : value);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setActiveIndex(-1);
    }, [suggestions]);

    function selectSuggestion(s: LocationSuggestion) {
        onChange(s.shortName, { lat: s.lat, lng: s.lng });
        setPristine(true); // não busca de novo até usuário digitar
        setIsOpen(false);
        setActiveIndex(-1);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (!isOpen || suggestions.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            selectSuggestion(suggestions[activeIndex]);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
        }
    }

    const showDropdown = isOpen && !pristine && value.trim().length >= 3;

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                <input
                    type="text"
                    id={inputId}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value); // sem coords enquanto digita
                        setPristine(false);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (!pristine && value.trim().length >= 3) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={showDropdown}
                    aria-controls={listboxId}
                    aria-activedescendant={
                        activeIndex >= 0 ? `${inputId}-opt-${activeIndex}` : undefined
                    }
                    className={
                        className ??
                        "w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 pl-9 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                    }
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-neutral-400 dark:text-neutral-500" />
                )}
            </div>

            {showDropdown && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                    <ul
                        id={listboxId}
                        role="listbox"
                        className="max-h-72 overflow-y-auto py-1"
                    >
                        {suggestions.length === 0 && !isLoading && !error && (
                            <li className="px-3 py-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                                Nenhum local encontrado
                            </li>
                        )}
                        {error && (
                            <li className="px-3 py-2.5 text-xs text-rose-600 dark:text-rose-400">
                                {error}
                            </li>
                        )}
                        {suggestions.map((s, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <li
                                    id={`${inputId}-opt-${i}`}
                                    key={s.id}
                                    role="option"
                                    aria-selected={isActive}
                                >
                                    <button
                                        type="button"
                                        onClick={() => selectSuggestion(s)}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        className={`flex w-full items-start gap-2 px-3 py-2 text-left ${isActive
                                            ? "bg-emerald-50 dark:bg-emerald-950/40"
                                            : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        <MapPin
                                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isActive
                                                ? "text-emerald-700 dark:text-emerald-400"
                                                : "text-neutral-400 dark:text-neutral-500"
                                                }`}
                                        />
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {s.shortName}
                                            </span>
                                            <span className="block truncate text-xs text-neutral-500 dark:text-neutral-400">
                                                {s.displayName}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="border-t border-neutral-100 bg-neutral-50 px-3 py-1.5 text-[10px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500">
                        Dados de{" "}
                        <a
                            href="https://www.openstreetmap.org/copyright"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                            © OpenStreetMap
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}