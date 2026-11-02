export * from '../../../shared/types/index.js';

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
