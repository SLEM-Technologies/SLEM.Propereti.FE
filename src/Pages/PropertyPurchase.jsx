import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { usePropertyById, usePayForProperty, usePaystackInit } from '../api/queries';
import AuthGuard from '../components/AuthGuard.tsx';

const schema = z.object({
  amount: z.preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number().positive('Amount must be positive')),
  agreedMonthlyPercentage: z.preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number().min(0)),
  paymentType: z.preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number().int()),
});

export default function PropertyPurchase() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const propQuery = usePropertyById(id);
  const payMutation = usePayForProperty();
  const paystackInit = usePaystackInit();
  const [form, setForm] = useState({ amount: '', agreedMonthlyPercentage: '0', paymentType: '1', email: '' });

  const startPaystack = () => {
    paystackInit.mutate({ amount: String(form.amount), email: form.email }, {
      onSuccess: (data) => {
        const redirectUrl = data?.authorization_url || data?.data?.authorization_url;
        if (redirectUrl) window.location.href = redirectUrl;
        else toast.error('Failed to start Paystack');
      },
      onError: () => toast.error('Failed to start Paystack'),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({ amount: form.amount, agreedMonthlyPercentage: form.agreedMonthlyPercentage, paymentType: form.paymentType });
    if (!parsed.success) {
      toast.error(parsed.error.errors.map((e) => e.message).join(', '));
      return;
    }
    payMutation.mutate({ porpertyId: id, amount: parsed.data.amount, agreedMonthlyPercentage: parsed.data.agreedMonthlyPercentage, paymentType: parsed.data.paymentType }, {
      onSuccess: () => {
        toast.success('Payment initiated');
        startPaystack();
      },
      onError: () => toast.error('Failed to initiate payment')
    });
  };

  return (
    <AuthGuard>
      <div style={{ padding: 16 }}>
        <h2>Purchase Property</h2>
        {propQuery.isLoading && <div>Loading property...</div>}
        {propQuery.isError && <div>Failed to load property</div>}
        {propQuery.data && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600 }}>{propQuery.data?.propertyName || propQuery.data?.data?.propertyName || id}</div>
          </div>
        )}
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
          <label>
            <div>Buyer Email (Paystack)</div>
            <input aria-label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            <div>Amount</div>
            <input aria-label="Amount" type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </label>
          <label>
            <div>Agreed Monthly %</div>
            <input aria-label="Agreed Monthly Percentage" type="number" step="0.01" value={form.agreedMonthlyPercentage} onChange={(e) => setForm({ ...form, agreedMonthlyPercentage: e.target.value })} />
          </label>
          <label>
            <div>Payment Type</div>
            <select aria-label="Payment Type" value={form.paymentType} onChange={(e) => setForm({ ...form, paymentType: e.target.value })}>
              <option value="1">One-time</option>
              <option value="2">Installments</option>
              <option value="3">Other</option>
            </select>
          </label>
          <button type="submit" disabled={payMutation.isPending || paystackInit.isPending}>Pay</button>
        </form>
      </div>
    </AuthGuard>
  );
}

