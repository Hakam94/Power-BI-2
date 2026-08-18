import { paypalFetch } from '../_lib/paypal.js';
import { getService } from '../_lib/services.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { serviceId } = req.body || {};
    const service = getService(serviceId);

    if (!service) {
      return res.status(400).json({ error: 'Unknown service.' });
    }

    const order = await paypalFetch('/v2/checkout/orders', {
      method: 'POST',
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: service.id,
            description: service.name.slice(0, 127),
            amount: {
              currency_code: service.currency,
              value: service.price,
            },
          },
        ],
      }),
    });

    return res.status(200).json({ id: order.id });
  } catch (error) {
    console.error('PayPal create-order error:', error);
    return res.status(500).json({ error: 'Could not create PayPal order.' });
  }
}
