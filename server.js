const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Segurança base 
app.disable('x-powered-by');
app.use(helmet());
app.use(helmet.hsts({ maxAge: 15552000 }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(express.json({ limit: '100kb' }));
app.use(rateLimit({ windowMs: 60_000, max: 60, standardHeaders: true, legacyHeaders: false }));

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Home
app.get('/', (req, res) => {
  res.send('App com endpoint vulnerável para teste de DAST.');
});

// Endpoint VULNERÁVEL proposital 
app.get('/vuln', (req, res) => {
  const input = req.query.payload || '';
  // VULNERABILITY: reflected XSS — echoing user-controlled input directly into HTML
  res.send(`<html><body><h1>Vulnerable page</h1><div>You typed: ${input}</div></body></html>`);
});

// Echo seguro
app.post('/echo', (req, res) => {
  const raw = req.body?.input;
  const input = (typeof raw === 'string')
    ? raw.replace(/[^\w\s.,-]/g, '').slice(0, 200)
    : null;
  return res.json({ you_sent: input });
});

app.listen(PORT, () => {
  console.log(`Servidor VULNERÁVEL ouvindo em http://127.0.0.1:${PORT}`);
});
