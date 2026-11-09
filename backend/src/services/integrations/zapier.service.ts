import axios from 'axios';
import { config } from '../../config/index.js';

export interface ZapierEventPayload {
  event: 'payment.created' | 'fraud.detected' | 'payout.dispatched' | 'quote.padded';
  paymentId: string;
  amountUSD: number;
  payeeName: string;
  status: string;
  details?: Record<string, any>;
  timestamp: string;
}

/**
 * Dispatches real-time forensic and payment events to Zapier webhooks.
 * Used for automated SMS/WhatsApp alerts, Notion transparency ledgers, and family notifications.
 */
export async function dispatchZapierEvent(payload: ZapierEventPayload): Promise<boolean> {
  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!zapierWebhookUrl) {
    console.log(`[Zapier Integration] Event simulated: ${payload.event} for payment #${payload.paymentId}`);
    return true;
  }

  try {
    await axios.post(zapierWebhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Verapay-Signature': 'sha256-verified',
      },
      timeout: 5000,
    });
    console.log(`[Zapier Integration] Dispatched event: ${payload.event}`);
    return true;
  } catch (error) {
    console.warn(`[Zapier Integration] Webhook delivery failed:`, error);
    return false;
  }
}
