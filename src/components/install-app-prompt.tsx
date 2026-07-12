"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "tc-install-dismissed";
const DISMISS_DAYS = 30;

function isIOS(): boolean {
    if (typeof navigator === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isSafari(): boolean {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("crios") && !ua.includes("fxios");
}

function isStandalone(): boolean {
    if (typeof window === "undefined") return false;
    return (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
}

function isRecentlyDismissed(): boolean {
    try {
        const raw = localStorage.getItem(DISMISS_KEY);
        if (!raw) return false;
        const { at } = JSON.parse(raw) as { at: number };
        const daysSince = (Date.now() - at) / (1000 * 60 * 60 * 24);
        return daysSince < DISMISS_DAYS;
    } catch {
        return false;
    }
}

/** Rotas em que o prompt NÃO deve aparecer (login/onboarding público) */
function shouldHideOnRoute(pathname: string): boolean {
    return (
        pathname === "/" ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/join")
    );
}

/** Se estamos dentro de uma viagem no mobile → bottom bar ocupa a parte inferior, subir o prompt */
function isInsideTrip(pathname: string): boolean {
    return /^\/trips\/[^/]+\/(dashboard|finances|roadmap|reservations|participants)/.test(
        pathname,
    );
}

export function InstallAppPrompt() {
    const pathname = usePathname();
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showIOSTip, setShowIOSTip] = useState(false);
    const [dismissed, setDismissed] = useState(true); // parte oculto

    useEffect(() => {
        // Já instalado ou dismissed recentemente → não mostra
        if (isStandalone()) return;
        if (isRecentlyDismissed()) return;

        // iOS não dispara beforeinstallprompt — mostramos dica manual
        if (isIOS() && isSafari()) {
            setShowIOSTip(true);
            setDismissed(false);
            return;
        }

        // Chrome/Edge/Samsung: escuta o evento
        function handleBeforeInstall(e: Event) {
            e.preventDefault(); // Impede o mini-infobar do Chrome
            setPrompt(e as BeforeInstallPromptEvent);
            setDismissed(false);
        }
        function handleInstalled() {
            setPrompt(null);
            setShowIOSTip(false);
            setDismissed(true);
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstall);
        window.addEventListener("appinstalled", handleInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
            window.removeEventListener("appinstalled", handleInstalled);
        };
    }, []);

    async function handleInstall() {
        if (!prompt) return;
        await prompt.prompt();
        const choice = await prompt.userChoice;
        // Se aceitou, o `appinstalled` handler cuida de esconder
        // Se recusou, marca como dismissed
        if (choice.outcome === "dismissed") {
            markDismissed();
        }
        setPrompt(null);
    }

    function markDismissed() {
        try {
            localStorage.setItem(DISMISS_KEY, JSON.stringify({ at: Date.now() }));
        } catch {
            /* ignore quota errors */
        }
        setDismissed(true);
        setPrompt(null);
        setShowIOSTip(false);
    }

    // Guards de renderização
    if (dismissed) return null;
    if (!prompt && !showIOSTip) return null;
    if (shouldHideOnRoute(pathname)) return null;

    const insideTrip = isInsideTrip(pathname);

    return (
        <div
            className={`fixed left-4 right-4 z-40 md:left-auto md:right-4 md:w-96 ${insideTrip
                    ? "bottom-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] md:bottom-4"
                    : "bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)]"
                }`}
        >
            <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                <button
                    type="button"
                    onClick={markDismissed}
                    aria-label="Dispensar"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-3 pr-8">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        <Download className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            Instalar TripControl
                        </p>
                        {showIOSTip ? (
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                Toque em{" "}
                                <Share className="inline h-3.5 w-3.5 align-text-bottom" />{" "}
                                e depois em <strong>Adicionar à Tela de Início</strong>.
                            </p>
                        ) : (
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                Acesse mais rápido pela tela inicial do seu dispositivo.
                            </p>
                        )}
                    </div>
                </div>

                {!showIOSTip && (
                    <div className="mt-3 flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={markDismissed}
                            className="flex-1"
                        >
                            Agora não
                        </Button>
                        <Button
                            size="sm"
                            leftIcon={Download}
                            onClick={handleInstall}
                            className="flex-1"
                        >
                            Instalar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}