'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Twitter } from 'lucide-react';
import styles from './ScoreReveal.module.css';

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
    return rounded.on('change', (latest) => {
      setDisplayScore(latest);
    });
  }, [rounded]);

  return (
    <div className={styles.wrap}>
      <motion.span
        className={styles.scoreNum}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {displayScore.toFixed(1)}
      </motion.span>
      <span className={styles.scoreLabel}>FairScore</span>

      <motion.div
        className={styles.tierBadge}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {tier} Tier
      </motion.div>

      <motion.a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `🔮 My FairScore on @FairScaleXYZ is ${score.toFixed(1)} — ${tier.charAt(0).toUpperCase() + tier.slice(1)} Tier!\n\nProve your Solana reputation on FairGate 👇\nhttps://superteam-fairgate.vercel.app`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.shareBtn}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Twitter size={12} />
        Share score
      </motion.a>
    </div>
  );
};
