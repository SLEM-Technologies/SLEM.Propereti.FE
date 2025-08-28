import React, { useState } from 'react';
import { useWalletStatements, useWalletWithdraw } from '../api/queries';
import { z } from 'zod';
import toast from 'react-hot-toast';

const withdrawSchema = z.object({
  amount: z.preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number({ invalid_type_error: 'Enter a valid amount' }).positive('Amount must be positive')),
});

export default function WalletStatements() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const listQuery = useWalletStatements({ page, pageSize, type: type || undefined, from: from || undefined, to: to || undefined });
  const withdrawMutation = useWalletWithdraw();

  const onFilter = (e) => {
    e.preventDefault();
    setPage(1);
    listQuery.refetch();
  };

  const onWithdraw = (e) => {
    e.preventDefault();
    const result = withdrawSchema.safeParse({ amount: withdrawAmount });
    if (!result.success) {
      toast.error(result.error.errors.map((e) => e.message).join(', '));
      return;
    }
    if (!window.confirm(`Withdraw ${result.data.amount}?`)) return;
    withdrawMutation.mutate(result.data.amount, {
      onSuccess: () => {
        toast.success('Withdrawal requested');
        setWithdrawAmount('');
      },
      onError: () => toast.error('Withdrawal failed'),
    });
  };

  const items = Array.isArray(listQuery.data?.data) ? listQuery.data.data : (listQuery.data?.items || []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Wallet Statements</h2>

      <form onSubmit={onFilter} style={{ display: 'grid', gap: 8, marginBottom: 12, maxWidth: 600 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label>
            <div>Type</div>
            <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </label>
          <label>
            <div>From</div>
            <input aria-label="From date" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label>
            <div>To</div>
            <input aria-label="To date" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </label>
          <div style={{ alignSelf: 'end' }}>
            <button type="submit" disabled={listQuery.isLoading}>Apply</button>
          </div>
        </div>
      </form>

      {listQuery.isLoading && <div>Loading statements...</div>}
      {listQuery.isError && <div>Failed to load statements</div>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items?.map((s, idx) => {
          const id = s?.id || idx;
          const amount = s?.amount ?? s?.Amount ?? '-';
          const kind = s?.type || s?.Type || s?.direction || '-';
          const date = s?.date || s?.createdAt || s?.timestamp || '-';
          const note = s?.note || s?.description || '';
          return (
            <li key={id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{kind} — {amount}</div>
                  <div style={{ color: '#666', fontSize: 12 }}>{String(date)}</div>
                </div>
                <div style={{ color: '#333' }}>{note}</div>
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || listQuery.isLoading}>Prev</button>
        <div>Page {page}</div>
        <button onClick={() => setPage((p) => p + 1)} disabled={items?.length < pageSize || listQuery.isLoading}>Next</button>
      </div>

      <hr style={{ margin: '16px 0' }} />

      <h3>Withdraw</h3>
      <form onSubmit={onWithdraw} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
        <label>
          <div>Amount</div>
          <input aria-label="Withdraw amount" type="number" step="0.01" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
        </label>
        <button type="submit" disabled={withdrawMutation.isPending}>Withdraw</button>
      </form>
    </div>
  );
}

