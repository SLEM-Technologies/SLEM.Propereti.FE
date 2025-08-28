import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePaystackInit, usePaystackVerify } from '../api/queries';
import toast from 'react-hot-toast';

export default function WalletFund() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const initMutation = usePaystackInit();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get('reference') || undefined;
  const verifyQuery = usePaystackVerify(reference);

  useEffect(() => {
    if (reference && verifyQuery.data) {
      toast.success('Payment verified');
    }
  }, [reference, verifyQuery.data]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    initMutation.mutate({ amount, email }, {
      onSuccess: (data: any) => {
        const redirectUrl = data?.authorization_url || data?.data?.authorization_url;
        if (redirectUrl) window.location.href = redirectUrl;
        else toast.error('Failed to start Paystack');
      },
      onError: () => toast.error('Failed to start Paystack')
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Fund Wallet</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Amount (kobo or cents string)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit" disabled={initMutation.isPending}>Pay</button>
      </form>
      {reference && <div>Verifying reference: {reference}...</div>}
    </div>
  );
}