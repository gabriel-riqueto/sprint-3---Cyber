// server.js — versão segura
const express = require('express');
const helmet = require('helmet');
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: { defaultSrc: ["'self'"] }
}));

const app = express();
const PORT = process.env.PORT || 3000;

// Segurança básica
app.disable('x-powered-by');                    // oculta a tecnologia
app.use(helmet());                              // set de cabeçalhos seguros
app.use(helmet.hsts({ maxAge: 15552000 }));     // HSTS ~180 dias
app.use(helmet.frameguard({ action: 'deny' })); // bloqueia iframe
app.use(express.json({ limit: '100kb' }));      // limita payload e já valida JSON

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Home
app.get('/', (req, res) => {
  res.send('teste para SAST/DAST/SCA.');
});

// Endpoint seguro 
app.post('/echo', (req, res) => {
  const input = typeof req.body?.input === 'string'
    ? req.body.input.slice(0, 200) 
    : null;
  return res.json({ you_sent: input });
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://127.0.0.1:${PORT}`);
});
