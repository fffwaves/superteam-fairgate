'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Users, Zap, TrendingUp, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GatedContentProps {
  currentTier: string;
}

const SECTIONS = [
  { 
    id: 'bronze', 
    title: 'Community Feed', 
    desc: 'Public discussion and news updates.', 
    icon: Users,
    tier: 'bronze'
  },
  { 
    id: 'silver', 
    title: 'Alpha Signals', 
    desc: 'Early warnings on market movements.', 
    icon: Zap,
    tier: 'silver'
  },
  { 
    id: 'gold', 
    title: 'Whale Tracker', 
    desc: 'Real-time monitoring of major wallet activity.', 
    icon: TrendingUp,
    tier: 'gold'
  },
  { 
    id: 'platinum', 
    title: 'Inner Circle', 
    desc: 'Exclusive private community and voting rights.', 
    icon: Crown,
    tier: 'platinum'
  }
];

const TIER_HIERARCHY = ['bronze', 'silver', 'gold', 'platinum'];

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
              transition={{ delay: 0.6 + (i * 0.1) }}
              className={cn(
                "relative overflow-hidden p-6 glass-card border-l-4",
                isUnlocked ? "border-l-violet-500" : "border-l-gray-700 opacity-60 grayscale-[0.5]"
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
                <div className={cn(
                  "p-3 rounded-xl",
                  isUnlocked ? "bg-violet-500/10 text-violet-500" : "bg-white/5 text-gray-500"
                )}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{section.title}</h4>
                  <p className="text-[10px] uppercase text-gray-500">Requires {section.tier}+</p>
                </div>
              </div>

              <div className="relative min-h-[80px]">
                {isUnlocked ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">{section.desc}</p>
                    <div className="h-20 bg-white/5 rounded-lg flex items-center justify-center border border-white/5">
                      <span className="text-xs text-violet-400 font-mono tracking-tighter animate-pulse">
                        &gt; DECRYPTING_ALPHA_STREAM...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 blur-sm select-none">
                    <p className="text-sm text-gray-500">Locked content. Increase your reputation score to reveal.</p>
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
