import { NextRequest, NextResponse } from 'next/server';
import { FairScaleResponse } from '@/lib/types';

const MOCK_DATA: FairScaleResponse = {
  wallet: "demo",
  fairscore_base: 65.0,
  social_score: 42.0,
  fairscore: 71.2,
  tier: "gold",
  badges: [
    {
      id: "diamond_hands",
      label: "Diamond Hands",
      description: "Long-term holder with conviction",
      tier: "platinum"
    },
    {
      id: "defi_native",
      label: "DeFi Native",
      description: "Active across multiple DeFi protocols",
      tier: "gold"
    },
    {
      id: "early_adopter",
      label: "Early Adopter",
      description: "Joined Solana ecosystem early",
      tier: "silver"
    },
    {
      id: "lst_staker",
      label: "LST Staker",
      description: "Staking via liquid staking tokens (mSOL, jitoSOL, bSOL)",
      tier: "gold"
    }
  ],
  timestamp: new Date().toISOString(),
  features: {
    lst_percentile_score: 0.75,
    major_percentile_score: 0.82,
    native_sol_percentile: 0.68,
    tx_count: 1250,
    active_days: 180,
    wallet_age_days: 365
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  const apiKey = process.env.FAIRSCALE_API_KEY;

  if (wallet === 'demo' || !apiKey || apiKey === 'mock') {
    return NextResponse.json(MOCK_DATA);
  }

  try {
    const response = await fetch(`https://api.fairscale.xyz/score?wallet=${wallet}`, {
      headers: {
        'fairkey': apiKey
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Wallet not found or no activity detected' }, { status: 404 });
      }
      if (response.status === 429) {
        return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
      }
      throw new Error(`FairScale API responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('FairScale API error:', error);
    return NextResponse.json(
      { error: 'Reputation service is currently unavailable. Please try again later.' }, 
      { status: 503 }
    );
  }
}
