import { Request, Response } from 'express';
import { parseInvoiceWithGemini } from '../services/ai/gemini-ocr.service.js';
import { runQuoteAgentCheck } from '../services/ai/quote-agent.service.js';
import { computeImageDHash, computeHammingDistance } from '../services/forensics/dhash.service.js';
import { resolveNubanAccount, calculateNameSimilarity } from '../services/payee/cac-nuban.service.js';

// Cache for synthetic duplicate photo testing
const HASH_ARCHIVE: string[] = ['a1f8902be34199c2'];

export async function analyzeInvoice(req: Request, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No invoice file uploaded.' });
    }

    const extracted = await parseInvoiceWithGemini(file.buffer, file.mimetype);

    // Compute perceptual hash to detect reused document images
    const docHash = await computeImageDHash(file.buffer);
    const isDuplicate = HASH_ARCHIVE.some(h => computeHammingDistance(h, docHash) < 5);

    res.status(200).json({
      success: true,
      data: extracted,
      forensics: {
        documentHash: docHash,
        isDuplicate,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function checkPayee(req: Request, res: Response) {
  try {
    const { claimedName, accountNumber, bankCode } = req.body;
    const resolvedName = await resolveNubanAccount(accountNumber, bankCode);
    const similarity = calculateNameSimilarity(claimedName, resolvedName);

    res.status(200).json({
      success: true,
      resolvedAccountName: resolvedName,
      claimedName,
      nameMatchScore: similarity,
      isVerified: similarity >= 80,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function checkMaterialQuote(req: Request, res: Response) {
  try {
    const { materialType, quantity, quotedTotalNGN, city } = req.body;
    const comparison = await runQuoteAgentCheck(materialType, quantity, quotedTotalNGN, city);

    res.status(200).json({
      success: true,
      comparison,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
