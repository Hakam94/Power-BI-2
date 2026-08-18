// Server-side source of truth for what can be purchased and at what price.
// The frontend also renders this catalog for display, but the PRICE CHARGED
// always comes from here — never trust an amount sent by the browser.
export const SERVICES = {
  'strategy-call': {
    id: 'strategy-call',
    name: '1:1 Power BI & DAX Strategy Session',
    price: '149.00',
    currency: 'USD',
  },
  'dashboard-audit': {
    id: 'dashboard-audit',
    name: 'Dashboard Performance & Design Audit',
    price: '249.00',
    currency: 'USD',
  },
  'ai-mcp-setup': {
    id: 'ai-mcp-setup',
    name: 'Power BI + AI/MCP Setup Service',
    price: '349.00',
    currency: 'USD',
  },
};

export function getService(serviceId) {
  return SERVICES[serviceId] || null;
}
