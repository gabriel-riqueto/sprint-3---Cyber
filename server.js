const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());           // cabeçalhos de segurança
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

// Endpoint 
app.get('/', (req, res) => {
  res.send('Teste de SAST/DAST/SCA.');
});

// Endpoint ruim para teste de SAST
app.post('/echo', (req, res) => {
  const { input } = req.body || {};

  return res.json({ you_sent: input || null });
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://127.0.0.1:${PORT}`);
});
