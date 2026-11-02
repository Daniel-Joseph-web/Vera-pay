import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createPayPalEscrowOrder, refundPayPalEscrow } from '../services/escrow/paypal-escrow.service.js';
import { disburseNairaPayout } from '../services/escrow/paystack-payout.service.js';

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
