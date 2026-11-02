import { Router, Request, Response } from 'express';

const router = Router();

// PayPal Webhook listener
router.post('/paypal', (req: Request, res: Response) => {
  const event = req.body;
  console.log(`[PayPal Webhook] Received event: ${event.event_type}`);

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    // Transition payment to ESCROW_HELD and enqueue verification job
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

export default router;
