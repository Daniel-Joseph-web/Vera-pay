import { create } from 'zustand';
import { TrafficLightSignal, PlanType, PayeeCategory } from '@shared/types/index';

interface PaymentFormState {
  payeeName: string;
  payeeCategory: PayeeCategory;
  accountNumber: string;
  bankCode: string;
  amountUSD: number;
  description: string;
  plan: PlanType;
}

interface PaymentStore {
  activePaymentId: string | null;
  form: PaymentFormState;
  activeVerdict: TrafficLightSignal | null;
  setPaymentId: (id: string | null) => void;
  updateForm: (updates: Partial<PaymentFormState>) => void;
  setVerdict: (verdict: TrafficLightSignal | null) => void;
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

export const usePaymentStore = create<PaymentStore>((set) => ({
  activePaymentId: null,
  form: defaultForm,
  activeVerdict: null,
  setPaymentId: (id) => set({ activePaymentId: id }),
  updateForm: (updates) => set((state) => ({ form: { ...state.form, ...updates } })),
  setVerdict: (verdict) => set({ activeVerdict: verdict }),
  reset: () => set({ activePaymentId: null, form: defaultForm, activeVerdict: null }),
}));
