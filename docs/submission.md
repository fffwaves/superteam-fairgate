# FairGate — Superteam Earn Submission Write-up

**Bounty:** Build Production App Integrating FairScale Reputation Infrastructure  
**Prize:** $5,000 USDC  
**Deadline:** March 1, 2026

---

## Submission Text (copy into Superteam Earn form)

**Project Name:** FairGate  
**Live URL:** https://superteam-fairgate.vercel.app  
**Demo (no wallet needed):** https://superteam-fairgate.vercel.app/demo  
**Repo:** https://github.com/fffwaves/superteam-fairgate

---

**Description:**

FairGate is a production-ready reputation gateway built on Solana, powered by FairScale's infrastructure. Connect your wallet to receive an instant FairScore (0–100) derived from your real on-chain activity — then unlock tiered content and communities based on your reputation.

**What it does:**
- Fetches FairScore and reputation data from the FairScale API via a secure server-side proxy (`/api/score`)
- Displays a score reveal animation with animated circular progress ring and tier badge (Bronze / Silver / Gold / Platinum)
- Shows proof-of-action badges (Diamond Hands, DeFi Native, Early Adopter, LST Staker)
- Score Breakdown panel: visualizes `fairscore_base` (on-chain) vs `social_score` split with animated progress bars
- Gates content sections by tier — each tier unlocks progressively more alpha (Community Feed → Alpha Signals → Whale Tracker → Inner Circle), with blur/lock on restricted content
- Wallet Activity Stats row: tx_count, active_days, wallet_age_days, native_sol_percentile, lst_percentile_score
- "Share your score" Twitter intent — lets users flex their tier on social
- Full skeleton loading states, error handling, and mobile responsive design
- **Live demo mode** at `/demo` — switch between Bronze/Silver/Gold/Platinum tiers to explore the full dashboard without connecting a wallet
- **Judge's Evaluation Guide** on `/demo` — collapsible checklist of all 6 FairScale integration points with exact source file refs
- Wallet support: Phantom, Solflare, Backpack, Coinbase Wallet (Wallet Standard compatible)

**FairScale Integration:**
- API called server-side with `fairkey` header to prevent key exposure
- Real-time score from `https://api.fairscale.xyz/score?wallet=<address>`
- Mock data fallback when API key is absent (for local dev / judges without a key)
- 1-hour cache on API responses for performance
- Response mapped to typed `FairScaleResponse` with score, tier, badges, and features
- All 6 FairScale data fields surfaced in UI: fairscore, fairscore_base, social_score, tier, badges[], features{}

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Solana Wallet Adapter, @solana/web3.js

---

## Checklist Before Submitting
- [x] Live demo working: https://superteam-fairgate.vercel.app
- [x] Demo without wallet: https://superteam-fairgate.vercel.app/demo
- [x] Repo is public: https://github.com/fffwaves/superteam-fairgate
- [x] FairScale API integrated (server-side, key protected)
- [x] README with screenshots and FairScale integration breakdown
- [x] Mobile responsive
- [x] Judge's Evaluation Guide on /demo
- [ ] **MANUAL ACTION REQUIRED:** Go to https://earn.superteam.fun/listings/fairathon/ → click "Submit Now" → paste the description above + add live URL + repo link

---

## Submission Fields (Superteam Earn typical form)

| Field | Value |
|-------|-------|
| Project Name | FairGate |
| Demo URL | https://superteam-fairgate.vercel.app |
| Demo (no wallet) | https://superteam-fairgate.vercel.app/demo |
| Repo URL | https://github.com/fffwaves/superteam-fairgate |
| Description | (use the block above) |
| Tech Stack | Next.js 14, Tailwind, Framer Motion, Solana Wallet Adapter, FairScale API |
| Tweet / Share | optional — tweet about it from your account with the live link |

---

## Notes
- 15 submissions already on the listing as of Feb 21, 2026
- Winner announced March 15, 2026
- Contact on Telegram: @zkishann (FairScale bounty contact)
- **Submission deadline: Mar 1 2026 — DO NOT WAIT, submit ASAP**
