'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users } from 'lucide-react';
import styles from './ScoreBreakdown.module.css';

interface ScoreBreakdownProps {
  fairscoreBase: number;
  socialScore: number;
  total: number;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ fairscoreBase, socialScore, total }) => {
  const onChainPct = total > 0 ? (fairscoreBase / total) * 100 : 0;
  const socialPct = total > 0 ? (socialScore / total) * 100 : 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Score Breakdown</div>

      <div className={styles.row}>
        <div className={styles.rowHead}>
          <span className={styles.rowLabel}>
            <BarChart3 size={14} />
            On-chain Activity
          </span>
          <span className={styles.rowVal}>{fairscoreBase.toFixed(1)}</span>
        </div>
        <div className={styles.track}>
          <motion.div
            className={styles.fill1}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, onChainPct)}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.rowHead}>
          <span className={styles.rowLabel}>
            <Users size={14} />
            Social Reputation
          </span>
          <span className={styles.rowVal2}>{socialScore.toFixed(1)}</span>
        </div>
        <div className={styles.track}>
          <motion.div
            className={styles.fill2}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, socialPct)}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.35 }}
          />
        </div>
      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>Combined FairScore</span>
        <span className={styles.totalVal}>{total.toFixed(1)} / 100</span>
      </div>
    </div>
  );
};
