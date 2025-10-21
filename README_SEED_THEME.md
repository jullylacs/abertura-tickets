Alterações aplicadas pelo assistente:
- Atualizado `src/app/globals.css` para tema branco e azul (variáveis CSS e estilos base).
- Adicionado `scripts/seed.ts` para popular DB com usuários e tickets de exemplo.
- Atualizado `package.json` com script `npm run seed` (usa ts-node).
Como usar:
1. Instale dependências: npm install
2. Rode o seed: npx ts-node scripts/seed.ts  (ou npm run seed)
3. Rode a aplicação: npm run dev
