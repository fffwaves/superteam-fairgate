'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Users, Zap, TrendingUp, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GatedContentProps {
  currentTier: string;
}

const TIER_HIERARCHY = ['bronze', 'silver', 'gold', 'platinum'];

const COMMUNITY_POSTS = [
  { user: 'sol_whale_42', text: 'Marinade just released a new LST with 8.2% APY 🔥', time: '2m ago' },
  { user: 'defi_lurker', text: 'Anyone else noticed the surge in Jupiter volume today?', time: '7m ago' },
  { user: 'early_ape', text: 'FairScale reputation scores are being used for whitelist access on 3 new projects', time: '14m ago' },
];

const ALPHA_SIGNALS = [
  { label: 'SOL Funding Rate', value: '+0.032%', trend: 'up', note: 'Elevated — longs paying shorts' },
  { label: 'Stablecoin Flows', value: '$48M in', trend: 'up', note: 'Net inflow to Solana bridges' },
  { label: 'NFT Floor Pressure', value: 'Mad Lads −2.1%', trend: 'down', note: 'Light selling near support' },
];

const WHALE_MOVES = [
  { wallet: '5FHw...9kJz', action: 'Staked 14,200 SOL → Marinade', value: '$2.1M', time: '6m ago' },
  { wallet: 'Gm7x...3pQs', action: 'Swapped 80K USDC → JitoSOL', value: '$80K', time: '11m ago' },
  { wallet: '9bRk...7mVc', action: 'Deposited 240K USDC → Kamino', value: '$240K', time: '23m ago' },
];

const INNER_CIRCLE_POSTS = [
  { user: 'validator_king', role: 'Platinum', text: 'Proposing a community vote: should we whitelist the new Drift V3 vault for reputation-gated access?', votes: 24 },
  { user: 'zkmode', role: 'Platinum', text: 'Private alpha: a top-5 DeFi protocol on Solana is integrating FairScore for tiered fee discounts. NDA ends Tuesday.', votes: 61 },
];

function CommunityFeed() {
  return (
    <div className="space-y-2">
      {COMMUNITY_POSTS.map((post, i) => (
        <div key={i} className="flex gap-3 py-2 border-b border-white/5 last:border-0">
          <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-[10px] text-violet-400 font-bold flex-shrink-0">
            {post.user[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-violet-400 font-semibold">@{post.user}</span>
            <p className="text-xs text-gray-300 mt-0.5 leading-snug">{post.text}</p>
          </div>
          <span className="text-[10px] text-gray-600 flex-shrink-0">{post.time}</span>
        </div>
      ))}
    </div>
  );
}

function AlphaSignals() {
  return (
    <div className="space-y-2">
      {ALPHA_SIGNALS.map((sig, i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-200">{sig.label}</span>
              <span className={cn("text-xs font-bold", sig.trend === 'up' ? 'text-emerald-400' : 'text-red-400')}>
                {sig.value}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">{sig.note}</p>
          </div>
          <div className={cn("w-2 h-2 rounded-full flex-shrink-0", sig.trend === 'up' ? 'bg-emerald-400' : 'bg-red-400')} />
        </div>
      ))}
    </div>
  );
}

function WhaleTracker() {
  return (
    <div className="space-y-2">
      {WHALE_MOVES.map((move, i) => (
        <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
          <div className="text-[10px] font-mono text-teal-400 pt-0.5 flex-shrink-0">{move.wallet}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-300 leading-snug">{move.action}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs font-bold text-teal-300">{move.value}</div>
            <div className="text-[10px] text-gray-600">{move.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InnerCircle() {
  return (
    <div className="space-y-3">
      {INNER_CIRCLE_POSTS.map((post, i) => (
        <div key={i} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-amber-400">@{post.user}</span>
            <span className="text-[9px] uppercase tracking-widest text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">{post.role}</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">{post.text}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] text-gray-500">👍 {post.votes} upvotes</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const SECTIONS = [
  {
    id: 'bronze',
    title: 'Community Feed',
    desc: 'Public discussion and news updates.',
    icon: Users,
    tier: 'bronze',
    content: <CommunityFeed />,
  },
  {
    id: 'silver',
    title: 'Alpha Signals',
    desc: 'Early warnings on market movements.',
    icon: Zap,
    tier: 'silver',
    content: <AlphaSignals />,
  },
  {
    id: 'gold',
    title: 'Whale Tracker',
    desc: 'Real-time monitoring of major wallet activity.',
    icon: TrendingUp,
    tier: 'gold',
    content: <WhaleTracker />,
  },
  {
    id: 'platinum',
    title: 'Inner Circle',
    desc: 'Exclusive private community and voting rights.',
    icon: Crown,
    tier: 'platinum',
    content: <InnerCircle />,
  },
];

export const GatedContent: React.FC<GatedContentProps> = ({ currentTier }) => {
  const currentTierIndex = TIER_HIERARCHY.indexOf(currentTier.toLowerCase());

  return (
    <div className="space-y-6">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Unlocked Content</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SECTIONS.map((section, i) => {
          const sectionTierIndex = TIER_HIERARCHY.indexOf(section.tier);
          const isUnlocked = currentTierIndex >= sectionTierIndex;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={cn(
                'relative overflow-hidden p-6 glass-card border-l-4',
                isUnlocked ? 'border-l-violet-500' : 'border-l-gray-700 opacity-60 grayscale-[0.5]'
              )}
            >
              {!isUnlocked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-gray-500" />
                </div>
              )}
              {isUnlocked && (
                <div className="absolute top-4 right-4">
                  <Unlock className="w-4 h-4 text-violet-500" />
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    isUnlocked ? 'bg-violet-500/10 text-violet-500' : 'bg-white/5 text-gray-500'
                  )}
                >
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{section.title}</h4>
                  <p className="text-[10px] uppercase text-gray-500">Requires {section.tier}+</p>
                </div>
              </div>

              <div className="relative min-h-[80px]">
                {isUnlocked ? (
                  <div>{section.content}</div>
                ) : (
                  <div className="space-y-2 blur-sm select-none pointer-events-none">
                    <p className="text-sm text-gray-500">
                      Locked content. Increase your reputation score to reveal.
                    </p>
                    <div className="h-20 bg-gray-900/50 rounded-lg flex items-center justify-center border border-white/5" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
