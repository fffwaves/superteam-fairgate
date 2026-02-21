import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/components/SolanaWalletProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FairGate | On-Chain Reputation Gateway",
  description: "Verify your Solana reputation and unlock exclusive gated benefits powered by FairScale.",
  keywords: ["Solana", "Reputation", "FairScale", "Web3", "Gated Content"],
  openGraph: {
    title: "FairGate | On-Chain Reputation Gateway",
    description: "Connect your Solana wallet to receive an instant FairScore (0–100) and unlock tiered content based on your on-chain reputation.",
    url: "https://superteam-fairgate.vercel.app",
    siteName: "FairGate",
    images: [
      {
        url: "https://superteam-fairgate.vercel.app/screenshot.png",
        width: 1280,
        height: 900,
        alt: "FairGate — The Reputation Layer of Solana",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FairGate | On-Chain Reputation Gateway",
    description: "Connect your Solana wallet to receive an instant FairScore and unlock tiered gated content powered by FairScale.",
    images: ["https://superteam-fairgate.vercel.app/screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "bg-[#0a0a0f] text-white min-h-screen")}>
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
