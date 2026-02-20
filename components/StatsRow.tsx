'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FairScaleFeatures } from '@/lib/types';
import { Calendar, Hash, Clock, BarChart3 } from 'lucide-react';

interface StatsRowProps {
  features: FairScaleFeatures;
}

export const StatsRow: React.FC<StatsRowProps> = ({ features }) => {
  const stats = [
    { label: 'Total Transactions', value: features.tx_count, icon: Hash, suffix: '' },
    { label: 'Active Days', value: features.active_days, icon: Calendar, suffix: ' d' },
    { label: 'Wallet Age', value: features.wallet_age_days, icon: Clock, suffix: ' d' },
    { label: 'Native SOL Rank', value: (features.native_sol_percentile * 100).toFixed(0), icon: BarChart3, suffix: '%' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + (i * 0.1) }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
              <stat.icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase text-gray-400 font-medium">{stat.label}</span>
          </div>
          <div className="text-xl font-bold">
            {stat.value}{stat.suffix}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
