# FairGate

**Prove Your Reputation. Unlock Your Access.**

FairGate is a production-ready reputation gateway built for the Solana ecosystem. It leverages [FairScale's](https://fairscale.xyz) infrastructure to analyze on-chain activity and social presence, generating a verifiable "FairScore" that grants users access to tiered content, communities, and alpha.

## 🚀 Live Demo

| | |
|---|---|
| **Main App** | [superteam-fairgate.vercel.app](https://superteam-fairgate.vercel.app) |
| **Wallet-free Demo** | [superteam-fairgate.vercel.app/demo](https://superteam-fairgate.vercel.app/demo) |
| **Repo** | [github.com/fffwaves/superteam-fairgate](https://github.com/fffwaves/superteam-fairgate) |

> **🎯 For judges:** Go to [/demo](https://superteam-fairgate.vercel.app/demo) to explore the full dashboard UI — no wallet needed. Use the tier switcher to preview Bronze / Silver / Gold / Platinum experiences.

![FairGate Dashboard](public/screenshot.png)

---

## ✨ Features

- **Instant Reputation Scoring** — Connect your wallet for an immediate FairScore (0–100) pulled from the FairScale API.
- **Tiered Access Control** — Content is dynamically gated: Bronze → Silver → Gold → Platinum unlocks progressively more alpha.
- **Score Breakdown Panel** — Animated progress bars visualizing `fairscore_base` (on-chain) vs `social_score` split.
- **Proof of Action Badges** — Diamond Hands, DeFi Native, Early Adopter, LST Staker — earned from real on-chain behavior.
- **Wallet Activity Stats** — Transaction count, active days, wallet age, and percentile breakdowns.
- **Share Your Score** — One-click Twitter intent to flex your FairScore to your network.
- **Score Refresh Button** — Re-fetch your latest score at any time without disconnecting.
- **Demo Mode** — Full dashboard walkthrough at `/demo` with tier switcher, no wallet required.
- **Responsive & Dark-First UI** — Polished, mobile-friendly design with Framer Motion animations.

---

## 🛠️ FairScale Integration

FairGate integrates the FairScale API **server-side** to protect the API key and prevent client-side manipulation.

```
User wallet → /api/score (Next.js route handler) → FairScale API → parsed response → UI
```

**Key integration details:**
- API called with `fairkey: <API_KEY>` header — key never exposed to the browser
- Full response mapping: `fairscore`, `fairscore_base`, `social_score`, `tier`, `badges[]`, `features{}`
- 1-hour cache (`Cache-Control: s-maxage=3600`) for performance
- Mock data fallback when `FAIRSCALE_API_KEY` is not set — judges can run locally without a key
- Score refresh forces cache bypass via `?t=<timestamp>` query param
- Typed with `FairScaleResponse` TypeScript interface for type safety

**API Route:** [`/app/api/score/route.ts`](app/api/score/route.ts)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Blockchain | @solana/web3.js + @solana/wallet-adapter |
| Wallets | Phantom, Solflare, Coinbase Wallet, Backpack + all Wallet Standard |
| Icons | Lucide React |
| Deployment | Vercel (Edge-compatible) |

---

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fffwaves/superteam-fairgate.git
   cd superteam-fairgate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment** *(optional — mock data works without a key)*
   ```bash
   # .env.local
   FAIRSCALE_API_KEY=your_fairscale_api_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

> Without `FAIRSCALE_API_KEY`, the app uses realistic mock data so you can explore the full UI locally.

---

## 📁 Project Structure

```
app/
  page.tsx           # Landing page — hero, tiers, how it works, FAQ
  dashboard/         # Live dashboard (requires wallet connection)
  demo/              # Walletless demo with tier switcher
  api/score/         # FairScale API proxy (server-side, key protected)
components/
  ScoreReveal        # Animated circular score gauge
  TierCard           # Tier badge + progression display
  ScoreBreakdown     # Animated base vs social score bars
  BadgeGrid          # Proof-of-action badges
  StatsRow           # Wallet activity stats (tx count, active days, etc.)
  GatedContent       # Tier-locked content sections
lib/
  types.ts           # FairScaleResponse TypeScript types
  utils.ts           # Tier color helpers, cn utility
```

---

## 🛡️ License

MIT — see [LICENSE](LICENSE) for details.

---

*Built for the **[Superteam Earn FairScale Bounty](https://earn.superteam.fun/listings/fairathon/)** · Powered by [FairScale](https://fairscale.xyz) · Deployed on [Vercel](https://vercel.com)*
