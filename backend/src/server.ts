import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import paymentRoutes from './routes/payment.routes.js';
import verificationRoutes from './routes/verification.routes.js';
import webhookRoutes from './routes/webhook.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors({ origin: config.clientUrl }));
app.use(express.json());

// API Routes
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/verification', verificationRoutes);
app.use('/api/v1/webhooks', webhookRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'HEALTHY', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`===============================================`);
  console.log(`  Verapay Backend Engine running on port ${config.port}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  Core: "Verify, then release."`);
  console.log(`===============================================`);
});

export default app;
