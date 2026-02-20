export interface Badge {
  id: string;
  label: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface FairScaleFeatures {
  lst_percentile_score: number;
  major_percentile_score: number;
  native_sol_percentile: number;
  tx_count: number;
  active_days: number;
  wallet_age_days: number;
}

export interface FairScaleResponse {
  wallet: string;
  fairscore_base: number;
  social_score: number;
  fairscore: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  badges: Badge[];
  timestamp: string;
  features: FairScaleFeatures;
}
