import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/contexts/user-context";
import { ToastProvider } from "@/contexts/toast-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastContainer } from "@/components/ui/toast";
import { TanStackQueryProvider } from "@/providers/query-client.provider";
import { RepositoriesProvider } from "@/providers/repositories.provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripControl",
  description: "Organize sua viagem em grupo com facilidade",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

// Script inline executado antes da hidratação — evita flash de tema errado
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('tc_theme');
      var theme = stored || 'system';
      var resolved = theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;
      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) { }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <TanStackQueryProvider>
            <RepositoriesProvider>
              <ToastProvider>
                <UserProvider>{children}</UserProvider>
                <ToastContainer />
              </ToastProvider>
            </RepositoriesProvider>
          </TanStackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}