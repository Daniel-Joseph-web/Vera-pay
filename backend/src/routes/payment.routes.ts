import { Router } from 'express';
import { createPayment, approvePayment, refundPayment } from '../controllers/payment.controller.js';

const router = Router();

router.post('/create', createPayment);
router.post('/:id/approve', approvePayment);
router.post('/:id/refund', refundPayment);

export default router;
