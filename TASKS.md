# TASKS - superteam-fairgate (FairGate)

**Bounty:** Build Production App Integrating FairScale Reputation Infrastructure  
**Prize:** $5,000 USDC | **Deadline:** Mar 1 2026  
**Live:** https://superteam-fairgate.vercel.app  
**Repo:** https://github.com/fffwaves/superteam-fairgate

---

## In Progress
(None)

## TODO

### Submission
- [x] Manual browser QA — connect wallet, verify score fetch + tier display ✅
- [x] Screenshot the live app for README ✅
- [ ] **HUMAN ACTION REQUIRED:** Submit on Superteam Earn: https://earn.superteam.fun/listings/fairathon/ — see docs/submission.md for copy-paste text
- [x] Make repo public before submitting ✅ (already public)

### Optional polish (if time allows)
- [ ] Add demo video / screen recording for submission
- [ ] Add Xverse wallet support
- [x] Add share-your-score button (Twitter intent) ✅
- [x] Refresh score button on dashboard ✅

---

## Completed

### Build + Deploy (Feb 20-21)
- [x] Scaffold Next.js 14 + Tailwind + Solana Wallet Adapter ✅
- [x] FairScale API proxy route (/api/score) — server-side key ✅
- [x] Mock data fallback when no API key ✅
- [x] Landing page — hero, CTA, wallet connect ✅
- [x] Dashboard — score reveal animation, tier badge, badges grid, stats row, gated content ✅
- [x] Tier gating logic (Bronze/Silver/Gold/Platinum) ✅
- [x] Protected dashboard (redirect if no wallet) ✅
- [x] Skeleton loading states ✅
- [x] Error handling (invalid wallet, rate limit, API down) ✅
- [x] Mobile responsive ✅
- [x] README.md (judges-ready) ✅
- [x] FairScale API key wired — .env.local + Vercel env ✅
- [x] Deployed to Vercel (prod) ✅
- [x] Full QA + UI polish pass ✅
- [x] Git pushed ✅
