'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Users, Zap, TrendingUp, Crown } from 'lucide-react';
import styles from './GatedContent.module.css';

interface GatedContentProps {
  currentTier: string;
}

const TIER_HIERARCHY = ['bronze', 'silver', 'gold', 'platinum'];

const COMMUNITY_POSTS = [
  { user: 'sol_whale_42', text: 'Marinade just released a new LST with 8.2% APY 🔥', time: '2m ago' },
  { user: 'defi_lurker', text: 'Anyone else noticed the surge in Jupiter volume today?', time: '7m ago' },
  { user: 'early_ape', text: 'FairScale reputation scores are being used for whitelist access on 3 new projects', time: '14m ago' },
];

const ALPHA_SIGNALS = [
  { label: 'SOL Funding Rate', value: '+0.032%', trend: 'up', note: 'Elevated — longs paying shorts' },
  { label: 'Stablecoin Flows', value: '$48M in', trend: 'up', note: 'Net inflow to Solana bridges' },
  { label: 'NFT Floor Pressure', value: 'Mad Lads −2.1%', trend: 'down', note: 'Light selling near support' },
];

const WHALE_MOVES = [
  { wallet: '5FHw...9kJz', action: 'Staked 14,200 SOL → Marinade', value: '$2.1M', time: '6m ago' },
  { wallet: 'Gm7x...3pQs', action: 'Swapped 80K USDC → JitoSOL', value: '$80K', time: '11m ago' },
  { wallet: '9bRk...7mVc', action: 'Deposited 240K USDC → Kamino', value: '$240K', time: '23m ago' },
];

const INNER_CIRCLE_POSTS = [
  { user: 'validator_king', role: 'Platinum', text: 'Proposing a community vote: should we whitelist the new Drift V3 vault for reputation-gated access?', votes: 24 },
  { user: 'zkmode', role: 'Platinum', text: 'Private alpha: a top-5 DeFi protocol on Solana is integrating FairScore for tiered fee discounts. NDA ends Tuesday.', votes: 61 },
];

function CommunityFeed() {
  return (
    <div>
      {COMMUNITY_POSTS.map((post, i) => (
        <div key={i} style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '0.6rem 0',
          borderBottom: i < COMMUNITY_POSTS.length - 1 ? '1px solid var(--bg-border)' : 'none'
        }}>
          <div style={{
            width: '1.5rem', height: '1.5rem',
            background: 'var(--accent-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', fontWeight: 600,
            flexShrink: 0
          }}>
            {post.user[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)' }}>@{post.user}</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.5 }}>{post.text}</p>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', flexShrink: 0 }}>{post.time}</span>
        </div>
      ))}
    </div>
  );
}

function AlphaSignals() {
  return (
    <div>
      {ALPHA_SIGNALS.map((sig, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.6rem 0',
          borderBottom: i < ALPHA_SIGNALS.length - 1 ? '1px solid var(--bg-border)' : 'none'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text)' }}>{sig.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: sig.trend === 'up' ? '#4be8a0' : '#e85b4b' }}>{sig.value}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>{sig.note}</p>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: sig.trend === 'up' ? '#4be8a0' : '#e85b4b', flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
}

function WhaleTracker() {
  return (
    <div>
      {WHALE_MOVES.map((move, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
          padding: '0.6rem 0',
          borderBottom: i < WHALE_MOVES.length - 1 ? '1px solid var(--bg-border)' : 'none'
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', paddingTop: '0.1rem', flexShrink: 0 }}>{move.wallet}</span>
          <p style={{ flex: 1, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{move.action}</p>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)' }}>{move.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)' }}>{move.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InnerCircle() {
  return (
    <div>
      {INNER_CIRCLE_POSTS.map((post, i) => (
        <div key={i} style={{
          padding: '0.75rem',
          border: '1px solid var(--bg-border)',
          borderLeft: '2px solid var(--accent)',
          marginBottom: i < INNER_CIRCLE_POSTS.length - 1 ? '0.5rem' : 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600, color: 'var(--accent)' }}>@{post.user}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)', border: '1px solid var(--bg-border)', padding: '0.1rem 0.35rem' }}>{post.role}</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{post.text}</p>
          <div style={{ marginTop: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)' }}>👍 {post.votes} upvotes</div>
        </div>
      ))}
    </div>
  );
}

const SECTIONS = [
  { id: 'bronze', title: 'Community Feed', desc: 'Public discussion and news updates.', icon: Users, tier: 'bronze', content: <CommunityFeed /> },
  { id: 'silver', title: 'Alpha Signals', desc: 'Early warnings on market movements.', icon: Zap, tier: 'silver', content: <AlphaSignals /> },
  { id: 'gold', title: 'Whale Tracker', desc: 'Real-time monitoring of major wallet activity.', icon: TrendingUp, tier: 'gold', content: <WhaleTracker /> },
  { id: 'platinum', title: 'Inner Circle', desc: 'Exclusive private community and voting rights.', icon: Crown, tier: 'platinum', content: <InnerCircle /> },
];

export const GatedContent: React.FC<GatedContentProps> = ({ currentTier }) => {
  const currentTierIndex = TIER_HIERARCHY.indexOf(currentTier.toLowerCase());

  return (
    <div>
      <div className={styles.title}>Unlocked Content</div>
      <div className={styles.grid}>
        {SECTIONS.map((section, i) => {
          const sectionTierIndex = TIER_HIERARCHY.indexOf(section.tier);
          const isUnlocked = currentTierIndex >= sectionTierIndex;

          return (
            <motion.div
              key={section.id}
              className={`${styles.panel} ${isUnlocked ? styles.panelUnlocked : styles.panelLocked}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isUnlocked ? 1 : 0.4, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <div className={styles.statusIcon}>
                {isUnlocked
                  ? <Unlock size={14} className={styles.unlockedIcon} />
                  : <Lock size={14} className={styles.lockedIcon} />
                }
              </div>

              <div className={styles.panelHead}>
                <div className={isUnlocked ? styles.panelIconWrap : styles.panelIconWrapLocked}>
                  <section.icon size={20} />
                </div>
                <div>
                  <span className={styles.panelTitle}>{section.title}</span>
                  <span className={styles.panelReq}>Requires {section.tier}+</span>
                </div>
              </div>

              {isUnlocked ? (
                <div className={styles.content}>{section.content}</div>
              ) : (
                <div>
                  <p className={styles.lockedContent}>Locked — increase your reputation to reveal.</p>
                  <div className={styles.lockedPlaceholder} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
