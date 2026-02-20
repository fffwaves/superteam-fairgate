'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, Zap } from 'lucide-react';
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
        <section className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Prove Your Reputation. <br />
              <span className="gradient-text">Unlock Your Access.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              FairGate uses FairScale's on-chain reputation engine to verify your activity 
              on Solana and grant you exclusive access to tiered content and communities.
            </p>
            <div className="flex justify-center">
              <WalletMultiButtonDynamic />
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

        {/* Tiers Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-12">Tiered Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Bronze", range: "0-40", color: "#cd7f32" },
              { name: "Silver", range: "40-60", color: "#c0c0c0" },
              { name: "Gold", range: "60-80", color: "#ffd700" },
              { name: "Platinum", range: "80-100", color: "#e5e4e2" }
            ].map((tier, i) => (
              <div key={i} className="glass-card p-6 border-t-4" style={{ borderTopColor: tier.color }}>
                <span className="text-2xl mb-2 block">{tier.name}</span>
                <span className="text-sm text-gray-400">Score: {tier.range}</span>
              </div>
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
