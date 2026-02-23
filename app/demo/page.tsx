'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ScoreReveal } from '@/components/ScoreReveal';
import { TierCard } from '@/components/TierCard';
import { BadgeGrid } from '@/components/BadgeGrid';
import { StatsRow } from '@/components/StatsRow';
import { GatedContent } from '@/components/GatedContent';
import { ScoreBreakdown } from '@/components/ScoreBreakdown';
import { FairScaleResponse } from '@/lib/types';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

const DEMO_DATA: FairScaleResponse = {
  wallet: 'Demo8xKzP9q3mNfTv7wRyHsLcJbX2QeAuDgVi6YoP4nZ',
  fairscore_base: 65.0,
  social_score: 42.0,
  fairscore: 71.2,
  tier: 'gold',
  badges: [
    {
      id: 'diamond_hands',
      label: 'Diamond Hands',
      description: 'Long-term holder with conviction',
      tier: 'platinum',
    },
    {
      id: 'defi_native',
      label: 'DeFi Native',
      description: 'Active across multiple DeFi protocols',
      tier: 'gold',
    },
    {
      id: 'early_adopter',
      label: 'Early Adopter',
      description: 'Joined Solana ecosystem early',
      tier: 'silver',
    },
    {
      id: 'lst_staker',
      label: 'LST Staker',
      description: 'Staking via liquid staking tokens (mSOL, jitoSOL, bSOL)',
      tier: 'gold',
    },
  ],
  timestamp: new Date().toISOString(),
  features: {
    lst_percentile_score: 0.75,
    major_percentile_score: 0.82,
    native_sol_percentile: 0.68,
    tx_count: 1250,
    active_days: 180,
    wallet_age_days: 365,
  },
};

export default function DemoPage() {
  const [data] = useState<FairScaleResponse>(DEMO_DATA);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm"
        >
          <FlaskConical className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Demo Mode</strong> — This is a live preview with sample data. Connect your Solana wallet on the{' '}
            <a href="/" className="underline underline-offset-2 hover:text-amber-300 transition-colors">
              home page
            </a>{' '}
            to see your real FairScore.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Reputation Dashboard</h1>
              <p className="text-gray-500 text-sm font-mono">
                Wallet: Demo...4nZ
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase text-gray-500 block mb-1">Last Updated</span>
                <span className="text-xs text-gray-400">{new Date(data.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Top row: Score + Tier info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ScoreReveal score={data.fairscore} tier={data.tier} />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <TierCard currentTier={data.tier} score={data.fairscore} />
              <ScoreBreakdown
                fairscoreBase={data.fairscore_base}
                socialScore={data.social_score}
                total={data.fairscore}
              />
              <StatsRow features={data.features} />
            </div>
          </div>

          {/* Middle row: Badges */}
          <BadgeGrid badges={data.badges} />

          {/* Bottom row: Gated Content */}
          <GatedContent currentTier={data.tier} />
        </motion.div>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2026 FairGate. All rights reserved.
      </footer>
    </div>
  );
}
