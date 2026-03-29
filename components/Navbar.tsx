'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { FlaskConical } from 'lucide-react';
import styles from './Navbar.module.css';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const TIER_COLORS: Record<string, string> = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
  platinum: '#e5e4e2',
};

const TIER_LABELS: Record<string, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
};

interface NavbarProps {
  demoMode?: boolean;
  activeTier?: string;
  onTierChange?: (tier: string) => void;
}

export const Navbar = ({ demoMode, activeTier, onTierChange }: NavbarProps) => {
    const { connected } = useWallet();

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    ◈ FAIR<span className={styles.accent}>GATE</span>
                </Link>

                <div className={styles.navRight}>
                    {connected && (
                        <Link href="/dashboard" className={styles.navLink}>
                            Dashboard
                        </Link>
                    )}
                    <WalletMultiButtonDynamic />
                </div>
            </div>

            {demoMode && activeTier && onTierChange && (
                <div className={styles.demoBar}>
                    <div className={styles.demoInner}>
                        <div className={styles.demoWarning}>
                            <FlaskConical className={styles.demoIcon} />
                            <span>
                                <strong>Demo Mode</strong> — Connect your wallet on the{' '}
                                <Link href="/" className={styles.demoLink}>home page</Link>{' '}
                                to see your real FairScore.
                            </span>
                        </div>
                        <div className={styles.tierSwitcher}>
                            <span className={styles.tierLabel}>Preview tier:</span>
                            {Object.keys(TIER_LABELS).map((tier) => (
                                <button
                                    key={tier}
                                    onClick={() => onTierChange(tier)}
                                    className={styles.tierBtn}
                                    style={{
                                        borderColor: activeTier === tier ? TIER_COLORS[tier] : 'rgba(255,255,255,0.1)',
                                        color: activeTier === tier ? TIER_COLORS[tier] : '#6b7280',
                                        background: activeTier === tier ? `${TIER_COLORS[tier]}18` : 'transparent',
                                    }}
                                >
                                    {TIER_LABELS[tier]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
