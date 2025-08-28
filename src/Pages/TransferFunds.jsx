import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useTransferFunds } from '../api/queries';

const schema = z.object({
  receiverId: z.string().uuid({ message: 'Receiver ID must be a valid UUID' }),
  amount: z.preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number({ invalid_type_error: 'Enter a valid amount' }).positive('Amount must be positive')),
});

export default function TransferFunds() {
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const mutation = useTransferFunds();

  const onSubmit = (e) => {
    e.preventDefault();
    const result = schema.safeParse({ receiverId, amount });
    if (!result.success) {
      const msg = result.error.errors.map((e) => e.message).join(', ');
      toast.error(msg || 'Invalid input');
      return;
    }
    mutation.mutate({ receiverId: result.data.receiverId, amount: result.data.amount }, {
      onSuccess: () => toast.success('Transfer successful'),
      onError: () => toast.error('Transfer failed'),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Transfer Funds</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
        <label>
          <div>Receiver ID</div>
          <input aria-label="Receiver ID" placeholder="UUID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
        </label>
        <label>
          <div>Amount</div>
          <input aria-label="Amount" type="number" step="0.01" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit" disabled={mutation.isPending}>Send</button>
      </form>
    </div>
  );
}

