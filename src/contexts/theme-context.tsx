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
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): Theme {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("tc_theme") as Theme) ?? "system";
}

function applyTheme(resolved: "light" | "dark") {
    const root = document.documentElement;
    if (resolved === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Inicialização lazy — lê localStorage na primeira renderização client-side
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === "undefined") return "system";
        return getStoredTheme();
    });

    const resolved: "light" | "dark" =
        theme === "system" ? getSystemTheme() : theme;

    // Aplica o tema sempre que mudar
    useEffect(() => {
        applyTheme(resolved);
    }, [resolved]);

    // Escuta mudanças no tema do sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        function handleSystemChange() {
            if (getStoredTheme() === "system") {
                applyTheme(getSystemTheme());
                // Força re-render
                setThemeState("system");
            }
        }
        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);

    function setTheme(newTheme: Theme) {
        setThemeState(newTheme);
        localStorage.setItem("tc_theme", newTheme);
        const newResolved = newTheme === "system" ? getSystemTheme() : newTheme;
        applyTheme(newResolved);
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme: resolved, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
    return context;
}