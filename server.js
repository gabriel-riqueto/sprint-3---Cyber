const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');  

const app = express();
const PORT = process.env.PORT || 3000;

// Segurança base
app.disable('x-powered-by');
app.use(helmet());


app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: { defaultSrc: ["'self'"] }
}));


app.use(helmet.hsts({ maxAge: 15552000 }));       
app.use(helmet.frameguard({ action: 'deny' }));   
app.use(rateLimit({
  windowMs: 60_000,  
  max: 60,          
  standardHeaders: true,
  legacyHeaders: false
}));


app.use(express.json({ limit: '100kb' }));


app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/', (req, res) => {
  res.send('App seguro para SAST/DAST/SCA.');
});


app.post('/echo', (req, res) => {
  const raw = req.body?.input;
  const input = (typeof raw === 'string')
    ? raw.replace(/[^\w\s.,-]/g, '').slice(0, 200)
    : null;
  return res.json({ you_sent: input });
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://127.0.0.1:${PORT}`);
});
