# WLOC Cloudflare deployment files

- `worker.js`: standalone Cloudflare Workers Module Worker. Paste the entire file into an existing Worker in Dashboard and deploy.
- `pages/_worker.js`: standalone Cloudflare Pages Advanced Mode worker.
- `pages/index.html`: placeholder asset for Pages Direct Upload.
- `pages/wrangler.jsonc`: Pages Wrangler configuration.

No environment variables, secrets, KV, D1, R2, Durable Objects or service bindings are required.
