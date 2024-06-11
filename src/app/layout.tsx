import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import Providers from "@/components/Providers";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={recursive.className}>
          <Toaster richColors closeButton />
          <Navbar />

          <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <Providers>
              {children}
            </Providers>

            <Footer />
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}
