import React from 'react';
import { useParams } from 'react-router-dom';
import { useTransactionDetails, useRefundTransaction, useOpenDispute, useResolveDispute } from '../api/queries';
import toast from 'react-hot-toast';

export default function TransactionDetail() {
  const { reference = '' } = useParams();
  const detailsQuery = useTransactionDetails(reference);
  const refundMutation = useRefundTransaction();
  const disputeMutation = useOpenDispute();
  const resolveMutation = useResolveDispute();

  const onRefund = () => {
    if (!reference) return;
    refundMutation.mutate(reference, {
      onSuccess: () => toast.success('Refund requested'),
      onError: () => toast.error('Refund failed'),
    });
  };

  const onDispute = () => {
    const reason = window.prompt('Enter dispute reason');
    if (!reason) return;
    disputeMutation.mutate({ reference, reason }, {
      onSuccess: () => toast.success('Dispute opened'),
      onError: () => toast.error('Dispute failed'),
    });
  };

  const onResolve = (approve) => {
    const note = window.prompt('Optional note for resolution') || undefined;
    resolveMutation.mutate({ reference, approve, note }, {
      onSuccess: () => toast.success('Dispute resolved'),
      onError: () => toast.error('Resolve failed'),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Transaction Detail</h2>
      {detailsQuery.isLoading && <div>Loading details...</div>}
      {detailsQuery.isError && <div>Failed to load details</div>}
      {!detailsQuery.isLoading && !detailsQuery.isError && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fafafa', padding: 12, borderRadius: 8 }}>
          {JSON.stringify(detailsQuery.data, null, 2)}
        </pre>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <button onClick={onRefund} disabled={refundMutation.isPending}>Refund</button>
        <button onClick={onDispute} disabled={disputeMutation.isPending}>Open Dispute</button>
        <button onClick={() => onResolve(true)} disabled={resolveMutation.isPending}>Approve Resolution</button>
        <button onClick={() => onResolve(false)} disabled={resolveMutation.isPending}>Reject Resolution</button>
      </div>
    </div>
  );
}

