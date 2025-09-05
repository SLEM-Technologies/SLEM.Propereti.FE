import React from 'react';
import { useLocation } from 'react-router-dom';
import { usePaystackReceipt } from '../api/queries';

export default function TransactionReceipt() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get('reference') || '';
  const receipt = usePaystackReceipt(reference);

  return (
    <div style={{ padding: 16 }}>
      <h2>Transaction Receipt</h2>
      {!reference && <div>No reference provided.</div>}
      {receipt.isLoading && <div>Loading receipt...</div>}
      {receipt.isError && <div>Failed to load receipt</div>}
      {!receipt.isLoading && !receipt.isError && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fafafa', padding: 12, borderRadius: 8 }}>{JSON.stringify(receipt.data, null, 2)}</pre>
      )}
    </div>
  );
}

