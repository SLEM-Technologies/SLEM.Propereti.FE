import React from 'react';
import { Link } from 'react-router-dom';
import { useTransactionHistory } from '../api/queries';
import toast from 'react-hot-toast';

export default function TransactionsHistory() {
  const historyQuery = useTransactionHistory();

  if (historyQuery.isLoading) {
    return <div style={{ padding: 16 }}>Loading transactions...</div>;
  }

  if (historyQuery.isError) {
    toast.error('Failed to load transactions');
  }

  const transactions = Array.isArray(historyQuery.data?.data) ? historyQuery.data.data : (historyQuery.data || []);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Transactions</h2>
        <Link to="/transactions/transfer" style={{ textDecoration: 'underline' }}>Transfer funds</Link>
      </div>
      {(!transactions || transactions.length === 0) && <div>No transactions found.</div>}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
        {transactions?.map((tx, idx) => {
          const reference = tx?.reference || tx?.Reference || tx?.id || tx?.transactionReference || String(idx);
          const amount = tx?.amount ?? tx?.Amount ?? tx?.totalAmount ?? '-';
          const status = tx?.status || tx?.Status || tx?.state || '-';
          const date = tx?.date || tx?.createdAt || tx?.created_on || tx?.timestamp || '-';
          return (
            <li key={reference} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Ref: {reference}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{String(date)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600 }}>{amount}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{String(status)}</div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <Link aria-label={`View details of transaction ${reference}`} to={`/transactions/${encodeURIComponent(reference)}`}>View details</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

