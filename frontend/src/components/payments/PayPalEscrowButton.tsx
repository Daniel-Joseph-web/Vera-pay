'use client';

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface PayPalProtectionButtonProps {
  paymentId: string;
  amountUSD: number;
  onSuccess: (orderId: string) => void;
  onError: (error: any) => void;
}

export const PayPalProtectionButton: React.FC<PayPalProtectionButtonProps> = ({
  paymentId,
  amountUSD,
  onSuccess,
  onError,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="h-12 w-full animate-pulse bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
        Loading PayPal Sandbox Rails...
      </div>
    );
  }

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', color: 'gold' }}
        createOrder={async () => {
          try {
            const res = await fetch(`/api/v1/payments/${paymentId}/create-order`, { method: 'POST' });
            const data = await res.json();
            return data.paypalOrderId;
          } catch (e) {
            return `MOCK_ORDER_${Date.now()}`;
          }
        }}
        onApprove={async (data) => {
          onSuccess(data.orderID);
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </div>
  );
};
