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

## 🏆 Hackathon Sponsor Integrations

Verapay was architected from the ground up for the **"Build What's Next with PayPal and AI"** Global Hackathon, deeply integrating the official hackathon sponsors:

| Sponsor | Integration Point & Purpose | Source Code |
| :--- | :--- | :--- |
| **PayPal** | **PayPal Sandbox v2 Orders & Refunds**: Funds are held in a secure hold upon order creation. 1-click instant refund returns 100% of principal to sender's PayPal balance if proof fails. | [`paypal-escrow.service.ts`](file:///c:/Users/USER/Downloads/vera-pay/backend/src/services/escrow/paypal-escrow.service.ts) |
| **Google Gemini AI** | **Multimodal Invoice OCR & Ground-Truth Verification**: Extracts student names, line-item arithmetic, and fees from messy phone photos in <1.2s using Gemini 1.5 Flash. | [`gemini-ocr.service.ts`](file:///c:/Users/USER/Downloads/vera-pay/backend/src/services/ai/gemini-ocr.service.ts) |
| **AG Grid** | **Enterprise Forensic Audit Grid**: Interactive high-performance data grid on the Sender Dashboard featuring column sorting, fuzzy search filter, status badges, and 1-click CSV audit export. | [`VerapayAGGrid.tsx`](file:///c:/Users/USER/Downloads/vera-pay/frontend/src/components/dashboard/VerapayAGGrid.tsx) |
| **Postman** | **Judge Evaluation Suite**: Full Postman Collection & Environment with pre-written automated test assertions covering Health, Payments, Verification, and Webhook dispatching. | [`verapay.postman_collection.json`](file:///c:/Users/USER/Downloads/vera-pay/postman/verapay.postman_collection.json) |
| **APIMatic** | **Multi-Language SDK & Developer Portal**: Complete OpenAPI 3.1 contract and APIMatic metadata enabling one-click generation of SDKs in Python, TypeScript, Java, and Go. | [`openapi.yaml`](file:///c:/Users/USER/Downloads/vera-pay/docs/openapi.yaml) & [`apimatic.json`](file:///c:/Users/USER/Downloads/vera-pay/apimatic.json) |
| **Render** | **Infrastructure-as-Code Blueprint (`render.yaml`)**: Zero-config deployment orchestrating backend Node.js API, Next.js frontend, and Managed PostgreSQL instance. | [`render.yaml`](file:///c:/Users/USER/Downloads/vera-pay/render.yaml) |
| **Zapier** | **Automated Forensic & Payout Webhooks**: Real-time event dispatcher triggering automated notifications (WhatsApp alerts, Notion transparency logs, Slack ops alerts) on `payment.created`, `payout.dispatched`, and `fraud.detected`. | [`zapier.service.ts`](file:///c:/Users/USER/Downloads/vera-pay/backend/src/services/integrations/zapier.service.ts) |
| **Elastic** | **Perceptual Photo Hash Search**: Sub-millisecond forensic indexing and Hamming distance comparisons to catch reused milestone photos across diaspora contractors. | [`elastic.service.ts`](file:///c:/Users/USER/Downloads/vera-pay/backend/src/services/integrations/elastic.service.ts) |

---

## 🎯 Prize Category Target Tracks

- 🥇 **Grand Prize & Top Placements ($12,000 / $8,000 / $5,000)**: Solves a multi-billion dollar real-world remittance fraud crisis for 200M+ diaspora remitters with working AI + PayPal rails.
- 🤖 **Best Use of Agentic Commerce ($5,000)**: Autonomous Quote Agent that actively compares contractor bills against local open-market commodity prices (Dangote cement, iron rods, gravel) and routes orders to verified local suppliers.
- ⚡ **Best Use of PayPal + AI ($5,000)**: Direct union of PayPal Sandbox v2 authorize-and-hold with Gemini Multimodal OCR and sharp perceptual dHash forensics.
- 📊 **Best Use of AG Grid ($5,000 / $2,000 / $1,000)**: Rich, theme-adaptive enterprise audit table allowing users to filter transactions, inspect fraud verdicts, and download audit logs.
- 🛠️ **Best Use of APIMatic ($1,000)**: OpenAPI 3.1 specification for instant client onboarding across any language.
- ☁️ **Best Use of Render ($1,000 Credits)**: Production-ready multi-service infrastructure manifest.

---

## 🧪 Postman & Judge Testing Instructions

Judges can test the complete backend API suite in 60 seconds using the bundled Postman files:

1. Open Postman -> Click **Import**.
2. Select `postman/verapay.postman_collection.json` and `postman/verapay.postman_environment.json`.
3. Select the **Verapay Local & Staging Environment**.
4. Run the Collection Runner to execute all tests:
   - `GET /health` -> Asserts 200 OK & `status: "HEALTHY"`.
   - `POST /api/v1/payments/create` -> Asserts 201 Created & returns `paypalOrderId`.
   - `POST /api/v1/payments/:id/approve` -> Asserts 200 OK & Paystack NIP transfer code.
   - `POST /api/v1/payments/:id/refund` -> Asserts 200 OK & 100% principal refunded.
   - `POST /api/v1/webhooks/zapier/test` -> Asserts real-time event dispatching.

---

## 🔒 The Core Security Principle
> **Equal security for all:** Everyone gets the same institutional-grade 4-step safety checks, whether on the free tier or a paid subscription. Premium never buys less checking or bypasses verification. It buys convenience, automated recurring payments, family collaboration tools, and faster human escalation.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
Copyright (c) 2026 Verapay Team.
