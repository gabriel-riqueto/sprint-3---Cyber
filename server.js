const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());           // cabeçalhos de segurança
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

// Endpoint simples
app.get('/', (req, res) => {
  res.send('Olá 👋 App de exemplo para SAST/DAST/SCA.');
});

// Endpoint intencionalmente "questionável" para demonstração de SAST
app.post('/echo', (req, res) => {
  const { input } = req.body || {};
  // ❗ Exemplo didático: nunca use eval na vida real
  // if (input && input.startsWith('calc:')) {
  //   return res.json({ result: eval(input.replace('calc:', '')) });
  // }
  return res.json({ you_sent: input || null });
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://127.0.0.1:${PORT}`);
});
