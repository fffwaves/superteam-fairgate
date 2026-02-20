'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { getTierColor } from '@/lib/utils';

interface ScoreRevealProps {
  score: number;
  tier: string;
}

export const ScoreReveal: React.FC<ScoreRevealProps> = ({ score, tier }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, (value) => Math.round(value * 10) / 10);

  useEffect(() => {
    spring.set(score);
  }, [score, spring]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayScore(latest);
    });
  }, [rounded]);

  const tierColor = getTierColor(tier);

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-card">
      <div className="relative">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke={tierColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="553"
            initial={{ strokeDashoffset: 553 }}
            animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {displayScore.toFixed(1)}
          </motion.span>
          <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">FairScore</span>
        </div>
      </div>
      
      <motion.div 
        className="mt-6 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
        style={{ backgroundColor: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}40` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {tier} Tier
      </motion.div>
    </div>
  );
};
