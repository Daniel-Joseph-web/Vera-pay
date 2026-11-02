import { Router } from 'express';
import multer from 'multer';
import { analyzeInvoice, checkPayee, checkMaterialQuote } from '../controllers/verification.controller.js';

const router = Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

router.post('/analyze-invoice', upload.single('invoice'), analyzeInvoice);
router.post('/check-payee', checkPayee);
router.post('/check-quote', checkMaterialQuote);

export default router;
