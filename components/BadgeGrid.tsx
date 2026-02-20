'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/lib/types';
import { getTierColor } from '@/lib/utils';
import { Award } from 'lucide-react';

interface BadgeGridProps {
  badges: Badge[];
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6">Reputation Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {badges.length > 0 ? (
          badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative"
                style={{ backgroundColor: `${getTierColor(badge.tier)}20` }}
              >
                <Award className="w-6 h-6" style={{ color: getTierColor(badge.tier) }} />
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: getTierColor(badge.tier) }}
                />
              </div>
              <span className="text-sm font-semibold text-center">{badge.label}</span>
              <span className="text-[10px] text-gray-500 text-center mt-1 uppercase">{badge.tier}</span>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500 text-sm italic">
            No badges earned yet. Keep interacting to unlock!
          </div>
        )}
      </div>
    </div>
  );
};
