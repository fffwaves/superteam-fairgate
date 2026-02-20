'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShieldCheck } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const Navbar = () => {
    const { connected } = useWallet();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-violet-500/20">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter">FAIR<span className="text-violet-500">GATE</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    {connected && (
                        <Link 
                            href="/dashboard" 
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}
                    <WalletMultiButtonDynamic />
                </div>
            </div>
        </nav>
    );
};
