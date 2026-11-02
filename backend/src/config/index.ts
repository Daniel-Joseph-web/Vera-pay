import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',

  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },

  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    apiUrl: process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com',
    webhookId: process.env.PAYPAL_WEBHOOK_ID || '',
  },

  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY || '',
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
    apiUrl: 'https://api.paystack.co',
  },

  pricing: {
    basicFeePercent: 1.5,
    basicFeeMinUSD: 1.0,
    basicFeeMaxUSD: 20.0,
    plusMonthlyPriceUSD: 9.99,
    plusMonthlyAllowanceUSD: 1000.0,
    projectsMilestoneFeePercent: 2.0,
  },
};
