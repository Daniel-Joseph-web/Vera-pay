'use client';

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalProtectionButtonProps {
  paymentId: string;
  amountUSD: number;
  onSuccess: (orderId: string) => void;
  onError?: (error: any) => void;
}

export const PayPalProtectionButton: React.FC<PayPalProtectionButtonProps> = ({
  paymentId,
  amountUSD,
  onSuccess,
  onError,
}) => {
  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    'AfD7kLuTKpFVmEGbhKXW8w4BPPrubknEUJHmkNrl4oHhy1dFpLw-WMaErhG_E4WknjXkfQu69_RVAgW9';

  return (
    <PayPalScriptProvider options={{ clientId, currency: 'USD', intent: 'capture' }}>
      <div className="w-full">
        <PayPalButtons
          style={{
            layout: 'vertical',
            shape: 'rect',
            color: 'gold',
            label: 'pay',
            height: 52,
          }}
          createOrder={async (data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  reference_id: paymentId,
                  description: `Verapay Escrow Protection for Payment #${paymentId}`,
                  amount: {
                    currency_code: 'USD',
                    value: amountUSD.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              onSuccess(details.id || data.orderID);
            } else {
              onSuccess(data.orderID);
            }
          }}
          onError={(err) => {
            console.error('PayPal Checkout Exception:', err);
            if (onError) onError(err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};
