# Hakam Data Studio — Website

The marketing site for Hakam Data Studio: React 19 + Vite + Tailwind CSS 4, with a
"1:1 Services" section that sells consulting sessions through PayPal.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`. The `/api/paypal/*` serverless
functions only run when deployed to a host that supports them (see below) or
when run through `vercel dev` locally — plain `vite dev` serves the frontend
only, so checkout will show the "not configured" state until then.

## Monetization approach

The **Services** section (`src/components/ServicesSection.jsx`) sells three
productized, fixed-price offers instead of open-ended "contact me" consulting —
this converts far better and lets checkout be fully self-serve:

1. **1:1 Power BI & DAX Strategy Session** — $149, live troubleshooting call.
2. **Dashboard Performance & Design Audit** — $249, async report review.
3. **Power BI + AI/MCP Setup Service** — $349, done-for-you setup connecting
   Power BI models to Claude/Codex via the MCP server (a differentiated offer
   — most Power BI consultants aren't teaching this yet).

Edit prices, names, and descriptions directly in `ServicesSection.jsx`, and
mirror any price change in `api/_lib/services.js` (the server-side catalog —
this is the price actually charged, so it's the one that matters for
security).

## PayPal integration

Payments use PayPal's Orders API v2 with a **server-authoritative price**:
the browser only ever sends a `serviceId`; the serverless functions in `/api`
look up the real price and create/capture the order with PayPal directly.
This prevents a buyer from tampering with the amount in devtools before
paying — a risk with pure client-side PayPal button integrations.

```
src/components/PayPalCheckoutModal.jsx   → renders PayPal Buttons (frontend)
api/paypal/create-order.js               → POST: creates a PayPal order (server)
api/paypal/capture-order.js              → POST: captures payment (server)
api/_lib/services.js                     → authoritative service catalog + prices
api/_lib/paypal.js                       → PayPal REST auth + fetch helper
```

### 1. Get PayPal credentials

1. Go to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) and log in with your PayPal business account.
2. Under **Sandbox → Apps & Credentials**, create (or use the default) app to get a sandbox **Client ID** and **Secret** for testing with fake money.
3. Later, do the same under **Live → Apps & Credentials** for real payments.

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the sandbox values:

```bash
cp .env.example .env
```

| Variable | Where it's used | Notes |
| --- | --- | --- |
| `VITE_PAYPAL_CLIENT_ID` | Frontend (bundled into JS) | Same value as `PAYPAL_CLIENT_ID`, safe to expose |
| `PAYPAL_CLIENT_ID` | `/api` functions | Same Client ID, read server-side |
| `PAYPAL_CLIENT_SECRET` | `/api` functions | **Never** expose this to the browser |
| `PAYPAL_ENV` | `/api` functions | `sandbox` or `live` |

### 3. Test with sandbox

Run the app on a host that executes the `/api` functions (see Deployment
below), open a service card, and pay with a [sandbox buyer
account](https://developer.paypal.com/dashboard/accounts) — no real money
moves. Confirm the order appears under **Sandbox → Notifications** in the
dashboard.

### 4. Go live

1. Swap the sandbox values in your host's environment variables for the
   **Live** Client ID/Secret.
2. Set `PAYPAL_ENV=live`.
3. Make a small real test purchase yourself to confirm end-to-end delivery.

### Fulfillment

There's no database or booking system wired up yet — after a successful
payment, the confirmation screen prompts the buyer to email
`contact@hakamdatastudio.com` to schedule. **Update that address** in
`PayPalCheckoutModal.jsx` to your real inbox. Consider replacing the mailto
link with a [Calendly](https://calendly.com) booking link once you have one,
and/or checking the PayPal dashboard periodically for new orders.

## Deployment

This project needs a host that runs the `/api` serverless functions, not just
static file hosting. **Vercel** works with zero config: it detects the Vite
frontend and the `api/` folder automatically.

```bash
npm install -g vercel
vercel
```

Then add the environment variables from the table above in the Vercel
project's **Settings → Environment Variables** (for both Preview and
Production).

If you deploy elsewhere (Netlify, Cloudflare Pages, etc.), the two files in
`api/paypal/` will need to be adapted to that platform's function format —
the logic in `api/_lib/` is plain Node and can be reused as-is.

---

## React + Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
