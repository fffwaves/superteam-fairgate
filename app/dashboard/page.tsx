'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ScoreReveal } from '@/components/ScoreReveal';
import { TierCard } from '@/components/TierCard';
import { BadgeGrid } from '@/components/BadgeGrid';
import { StatsRow } from '@/components/StatsRow';
import { GatedContent } from '@/components/GatedContent';
import { FairScaleResponse } from '@/lib/types';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [data, setData] = useState<FairScaleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const address = publicKey?.toBase58();
        
        if (!address) {
          throw new Error('Wallet not connected properly');
        }

        const response = await fetch(`/api/score?wallet=${address}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch reputation data');
        }

        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [connected, publicKey, router]);

  if (!connected) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-2">
                <div className="h-8 w-64 bg-white/5 rounded" />
                <div className="h-4 w-40 bg-white/5 rounded" />
              </div>
              <div className="h-10 w-32 bg-white/5 rounded" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-[300px] bg-white/5 rounded-2xl" />
              <div className="lg:col-span-2 space-y-8">
                <div className="h-32 bg-white/5 rounded-2xl" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-white/5 rounded-2xl" />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-64 bg-white/5 rounded-2xl" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-violet-600 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : data ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Reputation Dashboard</h1>
                <p className="text-gray-500 text-sm font-mono">
                  Wallet: {data.wallet.slice(0, 4)}...{data.wallet.slice(-4)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-gray-500 block mb-1">Last Updated</span>
                <span className="text-xs text-gray-400">{new Date(data.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Top row: Score + Tier info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <ScoreReveal score={data.fairscore} tier={data.tier} />
              </div>
              <div className="lg:col-span-2 space-y-8">
                <TierCard currentTier={data.tier} score={data.fairscore} />
                <StatsRow features={data.features} />
              </div>
            </div>

            {/* Middle row: Badges */}
            <BadgeGrid badges={data.badges} />

            {/* Bottom row: Gated Content */}
            <GatedContent currentTier={data.tier} />
          </motion.div>
        ) : null}
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2026 FairGate. All rights reserved.
      </footer>
    </div>
  );
}
