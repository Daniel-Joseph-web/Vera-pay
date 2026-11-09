import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createPayPalEscrowOrder, refundPayPalEscrow } from '../services/escrow/paypal-escrow.service.js';
import { disburseNairaPayout } from '../services/escrow/paystack-payout.service.js';
import { dispatchZapierEvent } from '../services/integrations/zapier.service.js';

export async function createPayment(req: Request, res: Response) {
  try {
    const { payeeName, bankCode, accountNumber, amountUSD, invoiceDescription, plan = 'BASIC' } = req.body;

    const paymentId = `pay_${uuidv4().substring(0, 8)}`;
    const exchangeRate = 1650.0;
    const amountNGN = amountUSD * exchangeRate;

    // Fee calculation logic
    let feeUSD = 0;
    if (plan === 'BASIC') {
      feeUSD = Math.max(1.0, Math.min(20.0, amountUSD * 0.015));
    } else if (plan === 'VERAPAY_PROJECTS') {
      feeUSD = amountUSD * 0.02;
    }

    const totalUSD = amountUSD + feeUSD;
    const paypalOrderId = await createPayPalEscrowOrder(paymentId, totalUSD);

    // Real-time notification dispatch via Zapier
    await dispatchZapierEvent({
      event: 'payment.created',
      paymentId,
      amountUSD: totalUSD,
      payeeName: payeeName || 'Beneficiary Institution',
      status: 'PENDING_FUNDING',
      details: { exchangeRate, amountNGN, plan },
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      paymentId,
      amountUSD,
      feeUSD,
      totalChargedUSD: totalUSD,
      exchangeRate,
      amountNGN,
      paypalOrderId,
      escrowStatus: 'PENDING_FUNDING',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function approvePayment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // In production, fetch Payment record from Prisma DB
    const mockPayment = {
      accountNumber: '0123456789',
      bankCode: '058',
      accountName: 'BRIGHT FUTURE ACADEMY LTD',
      amountNGN: 660000.0,
    };

    const payout = await disburseNairaPayout(
      mockPayment.accountNumber,
      mockPayment.bankCode,
      mockPayment.accountName,
      mockPayment.amountNGN,
      id
    );

    // Notify Zapier automation
    await dispatchZapierEvent({
      event: 'payout.dispatched',
      paymentId: id,
      amountUSD: mockPayment.amountNGN / 1650,
      payeeName: mockPayment.accountName,
      status: 'PAYOUT_INITIATED',
      details: { transferCode: payout.transferCode, amountNGN: mockPayment.amountNGN },
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      paymentId: id,
      escrowStatus: 'PAYOUT_INITIATED',
      transferCode: payout.transferCode,
      message: 'Verified funds successfully released to provider NUBAN account.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function refundPayment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const mockCaptureId = `CAP_${Date.now()}`;
    const refund = await refundPayPalEscrow(mockCaptureId, 400.0);

    // Notify Zapier automation of fraud intercept & refund
    await dispatchZapierEvent({
      event: 'fraud.detected',
      paymentId: id,
      amountUSD: 400.0,
      payeeName: 'Flagged Payee',
      status: 'REFUNDED',
      details: { refundId: refund.refundId, reason: 'Forensic discrepancy or user refund trigger' },
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      paymentId: id,
      escrowStatus: 'REFUNDED',
      refundId: refund.refundId,
      message: '100% of escrowed principal returned to your PayPal account.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
