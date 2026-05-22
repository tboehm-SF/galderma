# ASPIRE Galderma Practice Rewards — Demo

A premium demo website showcasing the ASPIRE Galderma Practice Rewards loyalty program for healthcare professionals and patients. Built with a luxury editorial aesthetic, real Galderma brand assets, Salesforce Loyalty Management integration, and an interactive AI-powered content explorer.

**Live:** [galderma-aspire-e31be09de09a.herokuapp.com](https://galderma-aspire-e31be09de09a.herokuapp.com/)

---

## Overview

This demo presents a complete digital experience for the ASPIRE Practice Rewards program — Galderma's loyalty platform for aesthetic providers. It includes an HCP-facing landing page, patient-facing subpage, real authentication against Salesforce Loyalty Management, a personalized practice portal with live member data, and an adaptive AI-powered content explorer.

## Pages & Features

| Route | Description |
|-------|-------------|
| `/` | HCP landing page — hero with treatment photography, practice tools, value proposition, enrollment CTA |
| `/patients` | Patient-facing rewards page — perks, how it works, treatment finder |
| `/login` | HCP sign-in — authenticates via Salesforce Loyalty Management, demo account pre-filled |
| `/register` | Practice enrollment form (inquiry type selection, email, zip) |
| `/portal` | Personalized practice dashboard — live member data, points, tier status, transactions, patients |

### Key Features

- **Salesforce Loyalty Management Integration** — Real-time authentication and data retrieval via jsforce: member lookup, tier status, currency balances, transaction history, patient rosters, and program tiers
- **Personalized Portal** — Dashboard displays live member data: reward points, status points, tier progression, transaction history, patient insights, challenges, education resources, and savings tracking
- **Adaptive Website (ExploreHCP)** — AI-style split-panel overlay with conversational interface and dynamic content panels (Practice Tools, Savings & Rebates, Business Growth)
- **Qualified Chat Widget** — Integrated conversational marketing via Qualified.com
- **Provider/Patient Toggle** — Context-aware header navigation switches between HCP and patient experiences
- **Full ISI Footer** — Complete Important Safety Information for Dysport, Restylane, and Sculptra with expandable accordions
- **Session Management** — Client-side session store for authenticated member data with automatic redirect protection

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| UI | React 19.2.4 |
| Styling | Tailwind CSS 4 (`@theme inline`) |
| Icons | Lucide React |
| Fonts | Inter (sans) + Playfair Display (serif) via `next/font` |
| Backend | Salesforce Loyalty Management via jsforce |
| Auth | Email-based member lookup against SF Loyalty Program Member |
| Deployment | Heroku |
| Chat | Qualified.com embedded agent |

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Next.js App (App Router)                       │
│                                                 │
│  /api/auth/login   → SF Member lookup + enrich  │
│  /api/member       → Transactions, patients     │
│  /api/health       → Health check               │
│                                                 │
│  lib/salesforce.ts → jsforce connection pool     │
│  lib/store.ts      → Client session (sessionStorage) │
└────────────────────────┬────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────┐
│  Salesforce Loyalty Management                  │
│                                                 │
│  LoyaltyProgramMember  → Member + Contact data  │
│  LoyaltyMemberTier     → Current tier status    │
│  LoyaltyMemberCurrency → Points balances        │
│  LoyaltyTierBenefit    → Tier-specific perks    │
│  TransactionJournal    → Purchase history       │
│  Contact               → Patient roster         │
│  LoyaltyProgramTier    → Tier progression map   │
└─────────────────────────────────────────────────┘
```

## Design System

- **Palette:** Navy (`#4A5D7F`), Cream (`#F5F1EC`), Gold (`#C9A96E`), Foreground (`#2C2C2C`)
- **Aesthetic:** Glassmorphic headers, grain textures, layered shadows, gold shimmer animations
- **Brand Assets:** Galderma logos (gold/white), ASPIRE background pattern with leaf shadows, clinical treatment photography
- **Typography:** Light serif headings (Playfair Display) with clean sans body (Inter)

## Project Structure

```
app/
  page.tsx              # HCP landing page
  patients/page.tsx     # Patient rewards page
  login/page.tsx        # Sign-in with SF auth + demo account helper
  register/page.tsx     # Enrollment form
  portal/page.tsx       # Personalized dashboard (6 tabs)
  layout.tsx            # Root layout + Qualified script
  globals.css           # Design system (custom properties, animations, utilities)
  api/
    auth/login/route.ts # POST — Member email lookup, tier, currencies, benefits
    member/route.ts     # GET — Transactions, patients (authenticated)
    health/route.ts     # GET — Health check endpoint

lib/
  salesforce.ts         # jsforce connection (3 auth strategies), SOQL queries
  store.ts              # Client-side session (MemberData type, sessionStorage)

components/
  Header.tsx            # Adaptive glassmorphic header with provider/patient toggle
  HCPHero.tsx           # Split hero with treatment photo + brand pattern
  PracticeTools.tsx     # 4 tool cards (insights, comms, savings, resources)
  HowItAddsUp.tsx       # Value proposition grid
  MembershipCTA.tsx     # Enrollment CTA with benefits checklist
  ExploreHCP.tsx        # Adaptive AI panel for HCP
  ExploreRewards.tsx    # Adaptive AI panel for patients
  Footer.tsx            # Full ISI + legal footer with Galderma branding

public/images/
  hero-treatment.jpg      # Clinical treatment photo
  bg-pattern.jpg          # ASPIRE beige background with leaf shadows
  galderma-logo-gold.png  # Gold Galderma logo (transparent)
  galderma-logo-white.png # White Galderma logo (transparent)
```

## Environment Variables

The Salesforce integration supports three auth strategies (in priority order):

```bash
# Option 1: Direct access token (fastest for demo)
SF_ACCESS_TOKEN=your_access_token
SF_INSTANCE_URL=https://your-instance.my.salesforce.com

# Option 2: OAuth Client Credentials (Connected App)
SF_CLIENT_ID=your_client_id
SF_CLIENT_SECRET=your_client_secret
SF_INSTANCE_URL=https://your-instance.my.salesforce.com

# Option 3: Username-password login
SF_USERNAME=user@example.com
SF_PASSWORD=password
SF_SECURITY_TOKEN=token
SF_LOGIN_URL=https://login.salesforce.com
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

The project deploys to Heroku via Git:

```bash
git push heroku main
```

Set Salesforce environment variables on Heroku:
```bash
heroku config:set SF_ACCESS_TOKEN=... SF_INSTANCE_URL=...
```

---

**Note:** This is a demo/prototype. Authentication is email-based against Salesforce Loyalty Management — no password verification. Session data is stored in browser sessionStorage only.
