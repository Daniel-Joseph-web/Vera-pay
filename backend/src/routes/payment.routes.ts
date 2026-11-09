import { Router } from 'express';
import { createPayment, createOrderForPayment, approvePayment, refundPayment } from '../controllers/payment.controller.js';

const router = Router();

router.post('/create', createPayment);
router.post('/:id/create-order', createOrderForPayment);
router.post('/:id/approve', approvePayment);
router.post('/:id/refund', refundPayment);

export default router;
