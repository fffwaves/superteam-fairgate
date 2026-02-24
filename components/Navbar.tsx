'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './Navbar.module.css';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const Navbar = () => {
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
        </nav>
    );
};
