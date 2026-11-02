import { GoogleGenAI } from '@google/genai';
import { config } from '../../config/index.js';
import { ExtractedInvoice } from '../../types/index.js';

const ai = new GoogleGenAI({ apiKey: config.gemini.apiKey });

export async function parseInvoiceWithGemini(fileBuffer: Buffer, mimeType: string): Promise<ExtractedInvoice> {
  const prompt = `
    Analyze this Nigerian invoice / school fee slip / hospital receipt.
    Extract the following structured JSON output:
    {
      "institutionName": "Exact name of school, hospital, landlord, or supplier",
      "studentOrPatientName": "Name of child or patient (or null if not applicable)",
      "invoiceNumber": "Invoice/Receipt reference number or null",
      "invoiceDate": "YYYY-MM-DD or null",
      "totalAmountNGN": Float total in Nigerian Naira,
      "lineItems": [
        {
          "description": "Item or fee category",
          "quantity": Float or 1,
          "unitPrice": Float,
          "total": Float
        }
      ],
      "bankDetails": {
        "accountNumber": "10-digit NUBAN if present",
        "bankName": "Bank name if present",
        "accountName": "Beneficiary name if present"
      }
    }
    Rules:
    - Return ONLY valid JSON.
    - Check that lineItems sum to totalAmountNGN.
    - Flag any visible alterations or mismatched handwriting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { inlineData: { data: fileBuffer.toString('base64'), mimeType } }
          ]
        }
      ],
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    return parsed as ExtractedInvoice;
  } catch (error) {
    console.error('Error in parseInvoiceWithGemini:', error);
    throw new Error('Gemini OCR extraction failed.');
  }
}
