import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

export default function PayPalCheckoutModal({ service, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errorMessage, setErrorMessage] = useState('');

  if (!service) return null;

  const handleCreateOrder = async () => {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId: service.id }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Could not start checkout.');
    }

    const order = await response.json();
    return order.id;
  };

  const handleApprove = async (data) => {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.error || 'Payment could not be captured.');
    }

    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 max-w-md w-full relative bg-[#0D0E12]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-[#BFFF00]" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-2">Payment Received</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Thanks for booking <strong className="text-white">{service.name}</strong>. A receipt is on its
              way from PayPal. To schedule your session, email the details below and I'll reply within 24
              hours with available times.
            </p>
            <a
              href={`mailto:contact@hakamdatastudio.com?subject=${encodeURIComponent(`Booking: ${service.name}`)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F2C811] text-black font-bold text-xs font-mono shadow-lg shadow-yellow-500/20 hover:bg-yellow-400"
            >
              <Mail className="w-4 h-4" />
              <span>Email to Schedule</span>
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs font-mono text-[#F2C811] uppercase tracking-wider block mb-2">
                Secure Checkout
              </span>
              <h3 className="text-xl font-bold text-white font-heading mb-1">{service.name}</h3>
              <p className="text-2xl font-extrabold text-white">
                ${service.price} <span className="text-xs font-mono text-gray-400 font-normal">USD</span>
              </p>
            </div>

            {!PAYPAL_CLIENT_ID ? (
              <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#F2C811] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-200 leading-relaxed">
                  PayPal checkout isn't configured yet. Set <code>VITE_PAYPAL_CLIENT_ID</code> in your
                  environment to enable payments.
                </p>
              </div>
            ) : (
              <PayPalScriptProvider
                options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD', intent: 'capture' }}
              >
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                  onCancel={() => setStatus('idle')}
                  onError={(err) => {
                    console.error('PayPal checkout error:', err);
                    setErrorMessage('Something went wrong with PayPal. Please try again.');
                    setStatus('error');
                  }}
                />
              </PayPalScriptProvider>
            )}

            {status === 'error' && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#BFFF00]" />
              <span>Payments processed securely by PayPal. No card data touches this site.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
