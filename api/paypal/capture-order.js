import { paypalFetch } from '../_lib/paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderID } = req.body || {};

    if (!orderID) {
      return res.status(400).json({ error: 'Missing orderID.' });
    }

    const capture = await paypalFetch(`/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
    });

    const status = capture.status;
    const payer = capture.payer || {};

    return res.status(200).json({
      status,
      orderID: capture.id,
      payerEmail: payer.email_address || null,
      payerName: payer.name
        ? `${payer.name.given_name || ''} ${payer.name.surname || ''}`.trim()
        : null,
    });
  } catch (error) {
    console.error('PayPal capture-order error:', error);
    return res.status(500).json({ error: 'Could not capture PayPal order.' });
  }
}
