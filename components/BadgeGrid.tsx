'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/lib/types';
import { getTierColor } from '@/lib/utils';
import { Award } from 'lucide-react';
import styles from './BadgeGrid.module.css';

interface BadgeGridProps {
  badges: Badge[];
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Reputation Badges</div>
      <div className={styles.grid}>
        {badges.length > 0 ? (
          badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className={styles.badgeIcon}>
                <Award size={20} style={{ color: getTierColor(badge.tier) }} />
              </div>
              <span className={styles.badgeName}>{badge.label}</span>
              <span className={styles.badgeTier}>{badge.tier}</span>
            </motion.div>
          ))
        ) : (
          <div className={styles.empty}>
            No badges earned yet — keep interacting on-chain.
          </div>
        )}
      </div>
    </div>
  );
};
