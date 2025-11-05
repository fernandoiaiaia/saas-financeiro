import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query";

export const metadata: Metadata = {
  title: "SaaS Financeiro",
  description: "Sistema SaaS de Gestão Financeira com Stripe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
