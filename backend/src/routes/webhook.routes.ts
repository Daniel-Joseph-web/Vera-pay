import { Router, Request, Response } from 'express';
import { dispatchZapierEvent } from '../services/integrations/zapier.service.js';

const router = Router();

// PayPal Webhook listener
router.post('/paypal', (req: Request, res: Response) => {
  const event = req.body;
  console.log(`[PayPal Webhook] Received event: ${event.event_type}`);

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    // Transition payment to verified hold and enqueue verification job
  }

  res.status(200).json({ received: true });
});

// Paystack Webhook listener
router.post('/paystack', (req: Request, res: Response) => {
  const event = req.body;
  console.log(`[Paystack Webhook] Received event: ${event.event}`);

  if (event.event === 'transfer.success') {
    // Mark payment COMPLETED and dispatch receipt to sender
  }

  res.status(200).json({ received: true });
});

// Zapier Test / Trigger Webhook
router.post('/zapier/test', async (req: Request, res: Response) => {
  const success = await dispatchZapierEvent({
    event: 'payment.created',
    paymentId: 'test_pay_001',
    amountUSD: 500,
    payeeName: 'Test Academy',
    status: 'VERIFIED',
    timestamp: new Date().toISOString(),
  });
  res.status(200).json({ success, message: 'Zapier test event dispatched' });
});

export default router;
