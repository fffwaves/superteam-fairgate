'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, Zap, Wallet, BarChart2, Unlock } from 'lucide-react';
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export default function LandingPage() {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.push('/dashboard');
    }
  }, [connected, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Zap className="w-3 h-3 fill-current" /> Powered by FairScale
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-[0.9]">
              The Reputation <br />
              <span className="gradient-text">Layer of Solana.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              FairGate instantly verifies your on-chain history to calculate your 
              FairScore. Join the elite and unlock exclusive gated benefits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <WalletMultiButtonDynamic />
              <a href="#tiers" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                View Tier Benefits ↓
              </a>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Shield, title: "Secure", desc: "No passwords. Only your wallet's history matters." },
            { icon: Award, title: "Reputation", desc: "Your score is calculated based on real on-chain activity." },
            { icon: Lock, title: "Gated", desc: "Exclusive content unlocked by your performance." },
            { icon: Zap, title: "Instant", desc: "Get your FairScore and tier in seconds." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <feature.icon className="w-10 h-10 text-violet-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* How It Works */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-500 text-center mb-12">Three steps to unlock your on-chain reputation.</p>
          <div className="relative grid md:grid-cols-3 gap-8">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0" />
            {[
              { icon: Wallet, step: '01', title: 'Connect Wallet', desc: 'Link your Solana wallet — Phantom, Solflare, Coinbase Wallet, or any Wallet Standard compatible wallet.' },
              { icon: BarChart2, step: '02', title: 'Score Calculated', desc: 'FairScale analyzes your on-chain activity — transactions, DeFi, staking, NFTs — and computes your FairScore in real-time.' },
              { icon: Unlock, step: '03', title: 'Unlock Benefits', desc: 'Your tier (Bronze → Platinum) determines which gated content, signals, and communities you can access.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-card p-8 text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
                  <item.icon className="w-7 h-7 text-violet-400" />
                </div>
                <div className="absolute top-4 right-4 text-[10px] font-mono text-violet-500/50 tracking-widest">{item.step}</div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tiers Section */}
        <section id="tiers" className="text-center">
          <h2 className="text-3xl font-bold mb-4">Reputation Tiers</h2>
          <p className="text-gray-500 mb-12">Higher scores unlock greater opportunities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bronze", range: "0-40", color: "#cd7f32", glow: "shadow-[0_0_20px_rgba(205,127,50,0.15)]" },
              { name: "Silver", range: "40-60", color: "#c0c0c0", glow: "shadow-[0_0_20px_rgba(192,192,192,0.15)]" },
              { name: "Gold", range: "60-80", color: "#ffd700", glow: "shadow-[0_0_20px_rgba(255,215,0,0.15)]" },
              { name: "Platinum", range: "80-100", color: "#e5e4e2", glow: "shadow-[0_0_20px_rgba(229,228,226,0.15)]" }
            ].map((tier, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className={`glass-card p-8 border-t-4 transition-all ${tier.glow}`} 
                style={{ borderTopColor: tier.color }}
              >
                <span className="text-2xl font-bold mb-2 block" style={{ color: tier.color }}>{tier.name}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">FairScore</span>
                <span className="text-xl font-mono text-white/80">{tier.range}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm">
        © 2026 FairGate. Powered by FairScale & Solana.
      </footer>
    </div>
  );
}
