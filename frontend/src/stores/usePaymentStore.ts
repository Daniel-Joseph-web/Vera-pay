import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TrafficLightSignal, PlanType, PayeeCategory } from '@shared/types/index';

export interface DashboardTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number; // NGN
  amountUSD: number;
  status: 'Verified' | 'Verifying' | 'Review Required' | 'Refunded';
  verifyUrl: string;
}

interface PaymentFormState {
  payeeName: string;
  payeeCategory: PayeeCategory;
  accountNumber: string;
  bankCode: string;
  amountUSD: number;
  description: string;
  plan: PlanType;
}

export interface LiveAnalysisResult {
  paymentId: string;
  signal: TrafficLightSignal;
  headline: string;
  description: string;
  providerName: string;
  cacReg: string;
  accountNumber: string;
  bankName: string;
  resolvedAccountName: string;
  nameMatchScore: number;
  amountUSD: number;
  amountNGN: number;
  checks: any[];
  extractedInvoice?: any;
  forensics?: any;
}

interface PaymentStore {
  activePaymentId: string | null;
  form: PaymentFormState;
  activeVerdict: TrafficLightSignal | null;
  lastAnalysisResult: LiveAnalysisResult | null;
  protectedBalanceUSD: number;
  verifiedCount: number;
  transactions: DashboardTransaction[];
  setPaymentId: (id: string | null) => void;
  updateForm: (updates: Partial<PaymentFormState>) => void;
  setVerdict: (verdict: TrafficLightSignal | null) => void;
  setAnalysisResult: (result: LiveAnalysisResult | null) => void;
  addNewPayment: (payment: {
    id: string;
    payeeName: string;
    category: string;
    amountUSD: number;
    description?: string;
  }) => void;
  approvePayment: (id: string) => void;
  refundPayment: (id: string) => void;
  reset: () => void;
}

const defaultForm: PaymentFormState = {
  payeeName: '',
  payeeCategory: 'SCHOOL',
  accountNumber: '',
  bankCode: '058',
  amountUSD: 400,
  description: '',
  plan: 'BASIC',
};

const INITIAL_TRANSACTIONS: DashboardTransaction[] = [
  {
    id: 'pay_school_fees',
    date: 'Today, 2:15 PM',
    description: 'Bright Future Academy • Tuition & Books',
    category: 'Education',
    amount: 660000,
    amountUSD: 400,
    status: 'Verified',
    verifyUrl: '/pay/pay_school_fees/verify?scenario=green',
  },
  {
    id: 'pay_padded_cement',
    date: 'Yesterday',
    description: 'Engr. Kayode • 500 Bags Dangote Cement',
    category: 'Construction',
    amount: 7100000,
    amountUSD: 4303,
    status: 'Review Required',
    verifyUrl: '/pay/pay_padded_cement/verify?scenario=amber',
  },
  {
    id: 'pay_hospital_bill',
    date: 'Oct 28, 2026',
    description: "LUTH Hospital • Dad's Eye Surgery Pot",
    category: 'Healthcare',
    amount: 2475000,
    amountUSD: 1500,
    status: 'Verified',
    verifyUrl: '/family',
  },
  {
    id: 'pay_project_milestone',
    date: 'Oct 24, 2026',
    description: '4-Bedroom Duplex • Blockwork to Lintel',
    category: 'Real Estate',
    amount: 3300000,
    amountUSD: 2000,
    status: 'Verified',
    verifyUrl: '/projects/proj-881',
  },
];

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set) => ({
      activePaymentId: null,
      form: defaultForm,
      activeVerdict: null,
      lastAnalysisResult: null,
      protectedBalanceUSD: 4063.0,
      verifiedCount: 12,
      transactions: INITIAL_TRANSACTIONS,

      setPaymentId: (id) => set({ activePaymentId: id }),
      updateForm: (updates) => set((state) => ({ form: { ...state.form, ...updates } })),
      setVerdict: (verdict) => set({ activeVerdict: verdict }),
      setAnalysisResult: (result) => set({ lastAnalysisResult: result }),

      addNewPayment: (payment) => {
        const amountNGN = payment.amountUSD * 1650;
        const newTx: DashboardTransaction = {
          id: payment.id,
          date: 'Just now',
          description: `${payment.payeeName} • ${payment.description || 'Payment'}`,
          category: payment.category,
          amount: amountNGN,
          amountUSD: payment.amountUSD,
          status: 'Verifying',
          verifyUrl: `/pay/${payment.id}/verify?scenario=green`,
        };
        set((state) => ({
          activePaymentId: payment.id,
          protectedBalanceUSD: state.protectedBalanceUSD + payment.amountUSD,
          transactions: [newTx, ...state.transactions],
        }));
      },

      approvePayment: (id) => {
        set((state) => ({
          verifiedCount: state.verifiedCount + 1,
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, status: 'Verified' as const } : tx
          ),
        }));
      },

      refundPayment: (id) => {
        set((state) => {
          const tx = state.transactions.find((t) => t.id === id);
          const refundAmount = tx ? tx.amountUSD : 400;
          return {
            protectedBalanceUSD: Math.max(0, state.protectedBalanceUSD - refundAmount),
            transactions: state.transactions.map((t) =>
              t.id === id ? { ...t, status: 'Refunded' as const } : t
            ),
          };
        });
      },

      reset: () =>
        set({
          activePaymentId: null,
          form: defaultForm,
          activeVerdict: null,
        }),
    }),
    {
      name: 'verapay-payment-storage',
      partialize: (state) => ({
        protectedBalanceUSD: state.protectedBalanceUSD,
        verifiedCount: state.verifiedCount,
        transactions: state.transactions,
      }),
    }
  )
);
