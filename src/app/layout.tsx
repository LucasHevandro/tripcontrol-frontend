import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/contexts/user-context";
import { ToastProvider } from "@/contexts/toast-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastContainer } from "@/components/ui/toast";
import { TanStackQueryProvider } from "@/providers/query-client.provider";
import { RepositoriesProvider } from "@/providers/repositories.provider";
import { GoogleAuthProvider } from "@/providers/google-oauth.provider";
import { InstallAppPrompt } from "@/components/install-app-prompt";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TripControl",
    template: "%s · TripControl",
  },
  description: "Organize sua viagem em grupo com facilidade",
  applicationName: "TripControl",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "TripControl",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
          <GoogleAuthProvider>
            <TanStackQueryProvider>
              <RepositoriesProvider>
                <ToastProvider>
                  <UserProvider>{children}</UserProvider>
                  <ToastContainer />
                  <InstallAppPrompt />
                </ToastProvider>
              </RepositoriesProvider>
            </TanStackQueryProvider>
          </GoogleAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}