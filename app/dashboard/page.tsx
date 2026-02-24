'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ScoreReveal } from '@/components/ScoreReveal';
import { TierCard } from '@/components/TierCard';
import { BadgeGrid } from '@/components/BadgeGrid';
import { StatsRow } from '@/components/StatsRow';
import { GatedContent } from '@/components/GatedContent';
import { ScoreBreakdown } from '@/components/ScoreBreakdown';
import { FairScaleResponse } from '@/lib/types';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [data, setData] = useState<FairScaleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = React.useCallback(async (isRefresh = false) => {
    if (!connected || !publicKey) return;
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      const address = publicKey.toBase58();
      const response = await fetch(`/api/score?wallet=${address}&t=${Date.now()}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch reputation data');
      }
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (!connected) {
      router.push('/');
      return;
    }
    fetchData();
  }, [connected, publicKey, router, fetchData]);

  if (!connected) return null;

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {loading ? (
          <div>
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonLine} style={{ height: '2rem', width: '16rem' }} />
              <div className={styles.skeletonLine} style={{ height: '0.875rem', width: '10rem' }} />
            </div>
            <div className={styles.skeletonGrid}>
              <div className={styles.skeletonBlock} style={{ height: '320px' }} />
              <div className={styles.skeletonBlock} style={{ height: '320px' }} />
            </div>
          </div>
        ) : error ? (
          <div className={styles.errorWrap}>
            <AlertCircle size={40} style={{ color: 'var(--accent)' }} />
            <h2 className={styles.errorTitle}>Error Loading Data</h2>
            <p className={styles.errorMsg}>{error}</p>
            <button className={styles.retryBtn} onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : data ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <div className={styles.header}>
              <div>
                <h1 className={styles.headerTitle}>Reputation Dashboard</h1>
                <p className={styles.wallet}>
                  {data.wallet.slice(0, 6)}...{data.wallet.slice(-6)}
                </p>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.timestampWrap}>
                  <span className={styles.timestampLabel}>Last Updated</span>
                  <span className={styles.timestamp}>{new Date(data.timestamp).toLocaleString()}</span>
                </div>
                <button
                  onClick={() => fetchData(true)}
                  disabled={refreshing}
                  className={styles.refreshBtn}
                >
                  <RefreshCw size={12} className={refreshing ? styles.spinning : undefined} />
                  {refreshing ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* Top grid */}
            <div className={styles.topGrid}>
              <div className={styles.gridLeft}>
                <ScoreReveal score={data.fairscore} tier={data.tier} />
              </div>
              <div className={styles.gridRight}>
                <div className={styles.gridRightInner}>
                  <TierCard currentTier={data.tier} score={data.fairscore} />
                </div>
                <div className={styles.gridRightInner}>
                  <ScoreBreakdown
                    fairscoreBase={data.fairscore_base}
                    socialScore={data.social_score}
                    total={data.fairscore}
                  />
                </div>
                <div className={styles.gridRightInner}>
                  <StatsRow features={data.features} />
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className={styles.section}>
              <BadgeGrid badges={data.badges} />
            </div>

            {/* Gated Content */}
            <div className={styles.section}>
              <GatedContent currentTier={data.tier} />
            </div>
          </motion.div>
        ) : null}
      </main>

      <footer className={styles.footer}>
        © 2026 FairGate. All rights reserved.
      </footer>
    </div>
  );
}
