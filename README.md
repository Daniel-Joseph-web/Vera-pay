# Verapay Core Platform
**"Verify, then release."**

> AI-verified, milestone-gated, sender-approved payments to Nigerian providers. Eliminating remittance fraud and diversion for school fees, family living support, and capital construction projects.

---

## 📚 Complete Documentation Suite (PDF & Markdown)

| Document | Compiled PDF | Markdown Source | Description |
| :--- | :--- | :--- | :--- |
| **Product Requirements (PRD v2.0)** | 📄 [Verapay_PRD_v2.0.pdf](./Verapay_PRD_v2.0.pdf) | [PRD.md](./PRD.md) | Business model, 3 plans (Basic, Plus, Projects), Tunde persona, and 3-min hackathon demo script. |
| **Functional Requirements (FRD)** | 📄 [Verapay_FRD.pdf](./Verapay_FRD.pdf) | [Verapay_FRD.md](./Verapay_FRD.md) | System requirements, 4-gate verification engine, role matrix, and acceptance criteria. |
| **Frontend Engineering Guide** | 📄 [Verapay_Frontend_Docs.pdf](./Verapay_Frontend_Docs.pdf) | [Verapay_Frontend_Docs.md](./Verapay_Frontend_Docs.md) | Next.js 14 App Router, WebRTC in-app camera, 15s surprise video, and state management. |
| **Backend Engineering Guide** | 📄 [Verapay_Backend_Docs.pdf](./Verapay_Backend_Docs.pdf) | [Verapay_Backend_Docs.md](./Verapay_Backend_Docs.md) | PostgreSQL Prisma schema, Gemini Flash OCR, dHash photo forensics, Paystack & PayPal APIs. |

---

## 🏗️ Repository Architecture

```
vera-pay/
 ├── shared/                          # Shared TypeScript types & interfaces
 │    └── types/index.ts              # Domain types (EscrowStatus, TrafficLight, Plans, Payees)
 │
 ├── frontend/                        # Next.js 14+ (App Router) + Tailwind CSS
 │    ├── src/
 │    │    ├── app/                   # App Router pages
 │    │    │    ├── page.tsx          # Landing / Hero / Plan chooser / Tunde story
 │    │    │    ├── (dashboard)/
 │    │    │    │    ├── dashboard/   # Sender escrow overview & metrics
 │    │    │    │    ├── pay/new/     # Start verified payment & bill upload
 │    │    │    │    ├── pay/[id]/verify/ # Gate 4 Traffic Light Decision Screen (Green/Amber/Red)
 │    │    │    │    ├── family/      # Verapay Plus: Shared Pots & Family Group Ledger
 │    │    │    │    └── projects/[id]/ # Verapay Projects: Milestone Stepper & Progress Tracker
 │    │    │    └── (mobile-contractor)/
 │    │    │         └── contractor/upload/[token]/ # On-site live camera & 15s surprise video
 │    │    ├── components/
 │    │    │    ├── verification/     # TrafficLightDecisionCard, QuoteComparisonModal
 │    │    │    ├── camera/           # InAppCamera (WebRTC), SurpriseVideoRecorder
 │    │    │    ├── projects/         # MilestoneProgressStepper
 │    │    │    ├── family/           # SharedPotWidget
 │    │    │    └── payments/         # PayPalEscrowButton
 │    │    ├── stores/                # Zustand client state (usePaymentStore)
 │    │    └── lib/                   # Formatting & utilities
 │    ├── package.json
 │    └── tsconfig.json
 │
 ├── backend/                         # Node.js + Express + Prisma ORM + Gemini AI
 │    ├── prisma/
 │    │    └── schema.prisma          # PostgreSQL models (Payment, Escrow, Verification, Payee)
 │    ├── src/
 │    │    ├── config/                # Environment configuration
 │    │    ├── controllers/           # Payment & verification controllers
 │    │    ├── middleware/            # Error handling & idempotency
 │    │    ├── routes/                # Express API routes (/payments, /verification, /webhooks)
 │    │    ├── services/
 │    │    │    ├── ai/                # Gemini Flash OCR & Autonomous Quote Agent
 │    │    │    ├── forensics/         # Sharp perceptual dHash image deduplication
 │    │    │    ├── payee/             # Paystack NUBAN resolve & CAC verification
 │    │    │    └── escrow/            # PayPal sandbox orders/refunds & Paystack payouts
 │    │    └── server.ts              # Express API server entrypoint
 │    ├── package.json
 │    └── tsconfig.json
 │
 ├── Verapay_PRD_v2.0.pdf             # Master PRD PDF
 ├── Verapay_FRD.pdf                  # Functional Requirements PDF
 ├── Verapay_Frontend_Docs.pdf        # Frontend Engineering PDF
 ├── Verapay_Backend_Docs.pdf         # Backend Engineering PDF
 └── convert_docs_to_pdf.py           # Automated documentation PDF generator
```

---

## 🚀 Developer Quickstart

### 1. Prerequisites
- **Node.js** >= 18.x
- **PostgreSQL** instance (local or Supabase)
- **PayPal Developer Sandbox** Account
- **Google Gemini API Key** (for multimodal invoice OCR)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL URL and API keys
npx prisma generate
npm run dev
```
Backend will start on `http://localhost:4000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
Frontend will start on `http://localhost:3000`.

---

## 🔒 The Core Security Principle
> **Equal security for all:** Everyone gets the same institutional-grade 4-step safety checks, whether on the free tier or a paid subscription. Premium never buys less checking or bypasses verification. It buys convenience, automated recurring payments, family collaboration tools, and faster human escalation.
