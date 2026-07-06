"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function getStoredTheme(): Theme {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("tc_theme") as Theme) ?? "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Lê preferência salva
        const stored = getStoredTheme();
        setThemeState(stored);

        // Resolve o tema efetivo
        const resolved = stored === "system" ? getSystemTheme() : stored;
        setResolvedTheme(resolved);
        applyTheme(resolved);

        // Escuta mudanças no tema do sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        function handleSystemChange(e: MediaQueryListEvent) {
            if (getStoredTheme() === "system") {
                const newResolved = e.matches ? "dark" : "light";
                setResolvedTheme(newResolved);
                applyTheme(newResolved);
            }
        }

        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);

    function applyTheme(resolved: "light" | "dark") {
        const root = document.documentElement;
        if (resolved === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }

    function setTheme(newTheme: Theme) {
        setThemeState(newTheme);
        localStorage.setItem("tc_theme", newTheme);

        const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
        setResolvedTheme(resolved);
        applyTheme(resolved);
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
    return context;
}