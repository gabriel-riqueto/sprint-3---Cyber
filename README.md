# ChallengeXP Security Starter (SAST + DAST + SCA)

Projeto mínimo para iniciantes com um app Node.js e um pipeline GitHub Actions que roda:
- **SAST (Semgrep)** → checa problemas no código
- **SCA (OWASP Dependency-Check)** → checa dependências vulneráveis
- **DAST (OWASP ZAP)** → testa a aplicação rodando (localhost)

## Como rodar localmente
1. Instale Node 20+ (https://nodejs.org).
2. No terminal:
   ```bash
   npm ci
   npm start
   # abra http://127.0.0.1:3000
   ```

## Como usar no GitHub
1. Crie um repositório novo e suba estes arquivos.
2. Vá em **Actions** e habilite workflows.
3. Faça um commit/push. O pipeline irá disparar automaticamente.
4. Resultados:
   - **SAST**: aba *Security > Code scanning alerts*.
   - **SCA**: artefatos **sca-reports** (HTML/XML/JSON).
   - **DAST**: artefatos **zap-report** (report_html.html e logs).

## Ajustes comuns
- Se o DAST acusar cabeçalhos de segurança, já usamos `helmet()` no `server.js`.
- Para silenciar falsos positivos do ZAP, edite `.zap/rules.tsv`.
- Para notificação (opcional), crie o secret `SECURITY_WEBHOOK_URL` no repositório.

## Dica para evidências (trabalho acadêmico)
- Faça um PR adicionando uma prática insegura (ex.: descomente o `eval` no `server.js`) e mostre o SAST bloqueando.
- Trave uma dependência antiga no `package.json` e rode o pipeline: o SCA vai marcar CVEs.
- Rode o DAST e corrija o que ele apontar (ex.: headers) → mostre o antes/depois.

## Licença
MIT
