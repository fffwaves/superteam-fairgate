'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <span className="text-white">F</span>
                </div>
                <span>FairGate</span>
            </Link>
            <div>
                <WalletMultiButtonDynamic />
            </div>
        </nav>
    );
};
