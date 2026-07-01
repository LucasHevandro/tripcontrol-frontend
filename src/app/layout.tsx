import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { UserProvider } from '@/contexts/user-context';
import { ToastProvider } from '@/contexts/toast-context';
import { ToastContainer } from '@/components/ui/toast';
import { TanStackQueryProvider } from '@/providers/query-client.provider';
import { RepositoriesProvider } from '@/providers/repositories.provider';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TripControl',
  description: 'Organize sua viagem em grupo com facilidade',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TanStackQueryProvider>
          <RepositoriesProvider>
            <ToastProvider>
              <UserProvider>{children}</UserProvider>
              <ToastContainer />
            </ToastProvider>
          </RepositoriesProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}