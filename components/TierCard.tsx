'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getTierGradient } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import styles from './TierCard.module.css';

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
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.label}>Current Status</div>
        <div className={styles.tierRow}>
          <span className={styles.tierName}>{currentTier}</span>
          {nextTier && (
            <span className={styles.nextTier}>
              <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              {nextTier.name}
            </span>
          )}
        </div>
      </div>

      <div>
        {nextTier ? (
          <>
            <div className={styles.progressLabel}>
              <span>Next tier</span>
              <span>{Math.max(0, nextTier.threshold - score).toFixed(1)} pts to {nextTier.name}</span>
            </div>
            <div className={styles.track}>
              <motion.div
                className={styles.fill}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </>
        ) : (
          <div className={styles.maxed}>
            <span className={styles.dot} />
            Maximum Reputation Achieved
          </div>
        )}
      </div>
    </div>
  );
};
