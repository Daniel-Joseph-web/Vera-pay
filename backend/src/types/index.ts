// backend/src/types/index.ts
// Shared domain models and interfaces for Verapay Core

export type UserRole =
  | 'DIASPORA_SENDER'
  | 'FAMILY_MEMBER'
  | 'CONTRACTOR'
  | 'FIELD_SURVEYOR'
  | 'ADMIN_OPERATOR';

export type PlanType = 'BASIC' | 'VERAPAY_PLUS' | 'VERAPAY_PROJECTS';

export type EscrowStatus =
  | 'PENDING_FUNDING'
  | 'ESCROW_HELD'
  | 'VERIFYING'
  | 'READY_FOR_APPROVAL'
  | 'PAYOUT_INITIATED'
  | 'COMPLETED'
  | 'REFUNDED'
  | 'DISPUTED';

export type TrafficLightSignal = 'GREEN' | 'AMBER' | 'RED';

export type PayeeCategory =
  | 'SCHOOL'
  | 'HOSPITAL'
  | 'LANDLORD'
  | 'BUILDING_SUPPLIER'
  | 'ARTISAN_INFORMAL';

export interface VerificationCheckItem {
  id: string;
  name: string;
  passed: boolean;
  statusText: string;
  category: 'PAYEE' | 'INVOICE' | 'PROOF' | 'PRICE';
}

export interface VerificationReport {
  paymentId: string;
  signal: TrafficLightSignal;
  headline: string;
  description: string;
  checks: VerificationCheckItem[];
  duplicateDetected: boolean;
  priceDeltaPercentage: number | null;
  quoteComparison?: {
    material: string;
    quotedPrice: number;
    marketAverage: number;
    savingsPotential: number;
  };
}

export interface PaymentItem {
  id: string;
  senderId: string;
  payeeName: string;
  payeeCategory: PayeeCategory;
  accountNumber: string;
  bankName: string;
  amountUSD: number;
  amountNGN: number;
  feeUSD: number;
  escrowStatus: EscrowStatus;
  riskSignal: TrafficLightSignal | null;
  createdAt: string;
}

export interface MilestoneStage {
  id: string;
  sequenceNumber: number;
  title: string;
  targetBudgetUSD: number;
  status: EscrowStatus;
  photoCount: number;
  videoVerified: boolean;
  surveyorVisited: boolean;
}

export interface SharedPotDetails {
  id: string;
  title: string;
  targetAmountUSD: number;
  collectedAmountUSD: number;
  status: 'COLLECTING' | 'TARGET_REACHED' | 'DISBURSED';
  contributors: Array<{
    userId: string;
    fullName: string;
    amountUSD: number;
    contributedAt: string;
  }>;
}

export interface ExtractedInvoice {
  institutionName: string;
  studentOrPatientName?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  totalAmountNGN: number;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
}

export interface QuoteComparisonResult {
  isPadded: boolean;
  quotedPrice: number;
  marketAveragePrice: number;
  deltaPercentage: number;
  recommendation: 'PRICE_FAIR' | 'PRICE_HIGH' | 'PRICE_EXTORTION';
  cheaperSuppliers: Array<{
    name: string;
    location: string;
    price: number;
    phone: string;
  }>;
}
