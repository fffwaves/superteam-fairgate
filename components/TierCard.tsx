'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getTierColor, getTierGradient } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface TierCardProps {
  currentTier: string;
  score: number;
}

const TIERS = [
  { name: 'Bronze', threshold: 0 },
  { name: 'Silver', threshold: 40 },
  { name: 'Gold', threshold: 60 },
  { name: 'Platinum', threshold: 80 },
  { name: 'Elite', threshold: 100 }
];

export const TierCard: React.FC<TierCardProps> = ({ currentTier, score }) => {
  const currentIndex = TIERS.findIndex(t => t.name.toLowerCase() === currentTier.toLowerCase());
  const nextTier = TIERS[currentIndex + 1] || null;
  
  const progress = nextTier 
    ? ((score - TIERS[currentIndex].threshold) / (nextTier.threshold - TIERS[currentIndex].threshold)) * 100
    : 100;

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Current Status</h3>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase">{currentTier}</span>
        </div>
        
        <div className="flex items-end gap-2 mb-6">
          <span className="text-3xl font-bold">{currentTier}</span>
          {nextTier && (
            <span className="text-gray-500 text-sm mb-1 flex items-center">
              <ChevronRight className="w-4 h-4" />
              {nextTier.name}
            </span>
          )}
        </div>
      </div>

      <div>
        {nextTier ? (
          <>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Next Reward</span>
              <span>{Math.max(0, nextTier.threshold - score).toFixed(1)} points to {nextTier.name}</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${getTierGradient(currentTier)}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </>
        ) : (
          <div className="text-xs text-amber-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Maximum Reputation Achieved
          </div>
        )}
      </div>
    </div>
  );
};
