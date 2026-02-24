'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FairScaleFeatures } from '@/lib/types';
import styles from './StatsRow.module.css';

interface StatsRowProps {
  features: FairScaleFeatures;
}

export const StatsRow: React.FC<StatsRowProps> = ({ features }) => {
  const stats = [
    { label: 'Transactions', value: features.tx_count, suffix: '' },
    { label: 'Active Days', value: features.active_days, suffix: 'd' },
    { label: 'Wallet Age', value: features.wallet_age_days, suffix: 'd' },
    { label: 'SOL Rank', value: (features.native_sol_percentile * 100).toFixed(0), suffix: '%' },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={styles.stat}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08 }}
        >
          <div className={styles.statLabel}>{stat.label}</div>
          <div className={styles.statVal}>{stat.value}{stat.suffix}</div>
        </motion.div>
      ))}
    </div>
  );
};
