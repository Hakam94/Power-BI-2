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

## Design system

The visual identity (near-black `#0B0B0B` background, glassmorphism panels,
PowerBI-yellow `#F2C811` / electric-cyan `#00D2FF` / lime `#BFFF00` accents,
Space Grotesk headings) lives in `src/index.css` as reusable utility classes
(`.glass-panel`, `.gradient-text-yellow`, `.cyber-grid`, etc.) — reuse those
rather than inventing new colors when adding sections.

`src/components/TiltCard.jsx` adds the mouse-follow 3D tilt + glare effect
used on the Services, Courses, and About cards. Wrap any `glass-panel` card
in it for the same effect elsewhere:

```jsx
<TiltCard><div className="glass-panel ...">...</div></TiltCard>
```

## PayPal integration

There are two checkout modes, and `PayPalCheckoutModal.jsx` picks between
them automatically:

| | Classic checkout (default) | Embedded checkout (optional upgrade) |
| --- | --- | --- |
| Works with | Any PayPal account, personal or business | PayPal Business account |
| Setup needed | Just an email — none | A REST API app (Client ID + Secret) |
| Buyer experience | Redirects to paypal.com, then back | Pays in an on-page widget, no redirect |
| Price integrity | Set in the browser, like any PayPal button | Enforced server-side in `/api` |

### Classic checkout (what's live right now)

Uses PayPal's long-standing hosted "Website Payments Standard" checkout —
just a form that posts to `paypal.com` with the receiving account's email.
No developer account, API app, or backend needed.

`VITE_PAYPAL_BUSINESS_EMAIL` defaults to **h.abushanab94@gmail.com** directly
in `PayPalCheckoutModal.jsx`, so this works out of the box. To use a
different receiving account later, set `VITE_PAYPAL_BUSINESS_EMAIL` in your
environment (see `.env.example`) — it overrides the default.

One setting worth turning on in your PayPal account, so buyers land back on
the site automatically instead of seeing a "Return to Merchant" link: log
into paypal.com → **Account Settings → Website preferences** → turn on
**Auto Return**, with the return URL set to your site's `/` (or leave it off
and buyers just click through manually — payment still goes through either
way).

**Note on trust:** this mode is genuinely simple and money will land in your
account correctly, but the "Payment complete" banner that appears back on
the site is just reading the redirect — it isn't cryptographically verified.
For a $150–350 consulting service that's a normal, low-risk tradeoff (check
your PayPal inbox/dashboard as the source of truth for what was actually
paid). If this business grows into higher order volumes or a need for
verified, database-backed order records, upgrade to the embedded flow below.

### Embedded checkout (optional, for later)

Payments happen via PayPal's Orders API v2 with a **server-authoritative
price** — the browser only ever sends a `serviceId`; the serverless
functions in `/api` look up the real price and create/capture the order
directly. This is the more tamper-resistant option (a buyer can't edit the
amount in devtools) and skips the redirect, but requires a PayPal Business
account and a few minutes of setup:

```
src/components/PayPalCheckoutModal.jsx   → renders PayPal Buttons (frontend)
api/paypal/create-order.js               → POST: creates a PayPal order (server)
api/paypal/capture-order.js              → POST: captures payment (server)
api/_lib/services.js                     → authoritative service catalog + prices
api/_lib/paypal.js                       → PayPal REST auth + fetch helper
```

1. Go to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) and log in.
2. Under **Sandbox → Apps & Credentials**, create an app to get a sandbox **Client ID** and **Secret** for testing with fake money.
3. Copy `.env.example` to `.env` and fill in `VITE_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_ID`, and `PAYPAL_CLIENT_SECRET` with those values.
4. Run the app on a host that executes the `/api` functions (see Deployment below) and pay with a [sandbox buyer account](https://developer.paypal.com/dashboard/accounts) — no real money moves.
5. When ready for real payments: create a **Live** app (requires upgrading to a Business account), swap in its Client ID/Secret, and set `PAYPAL_ENV=live`.

Setting `VITE_PAYPAL_CLIENT_ID` makes the embedded flow take over automatically — the classic checkout above becomes the fallback again if you unset it.

| Variable | Where it's used | Notes |
| --- | --- | --- |
| `VITE_PAYPAL_BUSINESS_EMAIL` | Frontend | Classic checkout receiving account; defaults to h.abushanab94@gmail.com |
| `VITE_PAYPAL_CLIENT_ID` | Frontend (bundled into JS) | Same value as `PAYPAL_CLIENT_ID`; set to enable embedded checkout |
| `PAYPAL_CLIENT_ID` | `/api` functions | Same Client ID, read server-side |
| `PAYPAL_CLIENT_SECRET` | `/api` functions | **Never** expose this to the browser |
| `PAYPAL_ENV` | `/api` functions | `sandbox` or `live` |

### Fulfillment

There's no database or booking system wired up — after a successful
payment, the buyer is prompted to email `h.abushanab94@gmail.com` to
schedule. Consider replacing that mailto link with a
[Calendly](https://calendly.com) booking link once you have one, and check
your PayPal account periodically for new orders either way.

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
