// Standalone keep-alive worker to keep Render free-tier services awake 24/7
const https = require('https');

const BACKEND_URL = process.env.BACKEND_URL || 'https://verapay-backend-16vb.onrender.com/health';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://verapay-frontend.onrender.com';
const INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function ping(url) {
  https.get(url, (res) => {
    console.log(`[${new Date().toISOString()}] Pinged ${url} -> Status ${res.statusCode}`);
  }).on('error', (err) => {
    console.warn(`[${new Date().toISOString()}] Ping warning for ${url}:`, err.message);
  });
}

console.log('[Verapay Keep-Alive Worker] Started. Pinging every 5 minutes...');
ping(BACKEND_URL);
ping(FRONTEND_URL);

setInterval(() => {
  ping(BACKEND_URL);
  ping(FRONTEND_URL);
}, INTERVAL_MS);
