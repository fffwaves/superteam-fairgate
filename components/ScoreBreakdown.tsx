'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users } from 'lucide-react';

interface ScoreBreakdownProps {
  fairscoreBase: number;
  socialScore: number;
  total: number;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ fairscoreBase, socialScore, total }) => {
  const onChainPct = total > 0 ? (fairscoreBase / total) * 100 : 0;
  const socialPct = total > 0 ? (socialScore / total) * 100 : 0;

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Score Breakdown</h3>

      <div className="space-y-3">
        {/* On-chain score */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              <span>On-chain Activity</span>
            </div>
            <span className="text-sm font-mono font-bold text-violet-300">{fairscoreBase.toFixed(1)}</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, onChainPct)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
          </div>
        </div>

        {/* Social score */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Social Reputation</span>
            </div>
            <span className="text-sm font-mono font-bold text-indigo-300">{socialScore.toFixed(1)}</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, socialPct)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.35 }}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-gray-500">Combined FairScore</span>
        <span className="text-sm font-mono font-bold text-white">{total.toFixed(1)} / 100</span>
      </div>
    </div>
  );
};
