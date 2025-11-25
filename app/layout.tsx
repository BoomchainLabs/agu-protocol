import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AGU Token dApp",
  description: "Manage liquidity and swap tokens across EVM and Solana networks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
