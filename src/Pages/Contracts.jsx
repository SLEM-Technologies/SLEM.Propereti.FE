import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useContractsList, useContractById, useCreateContract, useSignContract, useCancelContract } from '../api/queries';

const createSchema = z.object({
  propertyId: z.string().uuid('Property ID must be a UUID'),
  buyerUserId: z.string().uuid('Buyer ID must be a UUID'),
  sellerUserId: z.string().uuid('Seller ID must be a UUID'),
  contractType: z.string().optional(),
  body: z.string().min(10, 'Contract body required'),
});

export default function Contracts() {
  const [propertyId, setPropertyId] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState({ propertyId: '', buyerUserId: '', sellerUserId: '', contractType: '', body: '' });

  const listQuery = useContractsList(propertyId || undefined);
  const detailQuery = useContractById(selectedId || undefined);
  const createMutation = useCreateContract();
  const signMutation = useSignContract();
  const cancelMutation = useCancelContract();

  const onCreate = (e) => {
    e.preventDefault();
    const parsed = createSchema.safeParse({ ...form });
    if (!parsed.success) {
      toast.error(parsed.error.errors.map((e) => e.message).join(', '));
      return;
    }
    createMutation.mutate(parsed.data, {
      onSuccess: () => { toast.success('Contract created'); setForm({ propertyId: '', buyerUserId: '', sellerUserId: '', contractType: '', body: '' }); listQuery.refetch(); },
      onError: () => toast.error('Failed to create contract'),
    });
  };

  const onSign = (id, role) => {
    signMutation.mutate({ id, role }, { onSuccess: () => { toast.success('Signed'); detailQuery.refetch(); }, onError: () => toast.error('Sign failed') });
  };

  const onCancel = (id) => {
    if (!window.confirm('Cancel this contract?')) return;
    cancelMutation.mutate(id, { onSuccess: () => { toast.success('Cancelled'); listQuery.refetch(); }, onError: () => toast.error('Cancel failed') });
  };

  const contracts = Array.isArray(listQuery.data?.data) ? listQuery.data.data : (listQuery.data || []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Contracts</h2>

      <section style={{ marginBottom: 16 }}>
        <h3>Find by Property</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input aria-label="Property ID filter" placeholder="Property ID" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
          <button onClick={() => listQuery.refetch()} disabled={listQuery.isLoading}>Refresh</button>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>Create Contract</h3>
        <form onSubmit={onCreate} style={{ display: 'grid', gap: 8, maxWidth: 700 }}>
          <label>
            <div>Property ID</div>
            <input aria-label="Property ID" value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })} />
          </label>
          <label>
            <div>Buyer User ID</div>
            <input aria-label="Buyer User ID" value={form.buyerUserId} onChange={(e) => setForm({ ...form, buyerUserId: e.target.value })} />
          </label>
          <label>
            <div>Seller User ID</div>
            <input aria-label="Seller User ID" value={form.sellerUserId} onChange={(e) => setForm({ ...form, sellerUserId: e.target.value })} />
          </label>
          <label>
            <div>Contract Type</div>
            <input aria-label="Contract Type" value={form.contractType} onChange={(e) => setForm({ ...form, contractType: e.target.value })} placeholder="e.g. resale" />
          </label>
          <label>
            <div>Body</div>
            <textarea aria-label="Contract body" rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </label>
          <button type="submit" disabled={createMutation.isPending}>Create</button>
        </form>
      </section>

      <section>
        <h3>Contracts List</h3>
        {listQuery.isLoading && <div>Loading contracts...</div>}
        {listQuery.isError && <div>Failed to load contracts</div>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {contracts?.map((c) => (
            <li key={c?.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{c?.id}</div>
                  <div style={{ color: '#666', fontSize: 12 }}>Property: {c?.propertyId}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setSelectedId(c?.id)}>View</button>
                  <button onClick={() => onSign(c?.id, 'buyer')} disabled={signMutation.isPending}>Sign as buyer</button>
                  <button onClick={() => onSign(c?.id, 'seller')} disabled={signMutation.isPending}>Sign as seller</button>
                  <button onClick={() => onCancel(c?.id)} disabled={cancelMutation.isPending}>Cancel</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {selectedId && (
        <section style={{ marginTop: 24 }}>
          <h3>Contract Detail</h3>
          {detailQuery.isLoading && <div>Loading contract...</div>}
          {detailQuery.isError && <div>Failed to load contract</div>}
          {!detailQuery.isLoading && !detailQuery.isError && (
            <pre style={{ whiteSpace: 'pre-wrap', background: '#fafafa', padding: 12, borderRadius: 8 }}>{JSON.stringify(detailQuery.data, null, 2)}</pre>
          )}
        </section>
      )}
    </div>
  );
}

