import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useGetBankDetails, useAddBankDetails, useUpdateBankDetails, useUpdateUserProfile, useUserProfile } from '../api/queries';
import AuthGuard from '../components/AuthGuard.tsx';

const bankSchema = z.object({
  bankName: z.string().min(2, 'Bank name required'),
  accountName: z.string().min(2, 'Account name required'),
  accountNumber: z.string().min(6, 'Account number required'),
  bvn: z.string().min(6, 'BVN required'),
});

export default function KYC() {
  const profile = useUserProfile();
  const getBank = useGetBankDetails();
  const addBank = useAddBankDetails();
  const updateBank = useUpdateBankDetails();
  const updateProfile = useUpdateUserProfile();

  const [bank, setBank] = useState({ bankName: '', accountName: '', accountNumber: '', bvn: '' });
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    const existing = getBank.data?.data ?? getBank.data;
    if (existing) {
      setBank({
        bankName: existing.bankName || '',
        accountName: existing.accountName || '',
        accountNumber: existing.accountNumber || '',
        bvn: existing.bvn || '',
      });
    }
    const p = profile.data?.data ?? profile.data;
    if (p) {
      setAddress(p.address || '');
      setCity(p.city || '');
      setState(p.state || '');
    }
  }, [getBank.data, profile.data]);

  const onSaveBank = (e) => {
    e.preventDefault();
    const parsed = bankSchema.safeParse(bank);
    if (!parsed.success) return toast.error(parsed.error.errors.map(e => e.message).join(', '));
    const hasExisting = !!(getBank.data && (getBank.data.data || getBank.data));
    const mutate = hasExisting ? updateBank : addBank;
    mutate.mutate(parsed.data, {
      onSuccess: () => { toast.success('Bank details saved'); getBank.refetch(); },
      onError: () => toast.error('Failed to save bank details'),
    });
  };

  const onSaveAddress = (e) => {
    e.preventDefault();
    updateProfile.mutate({ address, city, state }, {
      onSuccess: () => { toast.success('Address saved'); profile.refetch(); },
      onError: () => toast.error('Failed to save address'),
    });
  };

  return (
    <AuthGuard>
      <div style={{ padding: 16 }}>
        <h2>KYC</h2>

        <section style={{ marginBottom: 16 }}>
          <h3>Address</h3>
          <form onSubmit={onSaveAddress} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
            <label>
              <div>Address</div>
              <input aria-label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
              <div>City</div>
              <input aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
              <div>State</div>
              <input aria-label="State" value={state} onChange={(e) => setState(e.target.value)} />
            </label>
            <button type="submit" disabled={updateProfile.isPending}>Save Address</button>
          </form>
        </section>

        <section>
          <h3>Bank Details</h3>
          {getBank.isLoading && <div>Loading bank details...</div>}
          <form onSubmit={onSaveBank} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
            <label>
              <div>Bank Name</div>
              <input aria-label="Bank name" value={bank.bankName} onChange={(e) => setBank({ ...bank, bankName: e.target.value })} />
            </label>
            <label>
              <div>Account Name</div>
              <input aria-label="Account name" value={bank.accountName} onChange={(e) => setBank({ ...bank, accountName: e.target.value })} />
            </label>
            <label>
              <div>Account Number</div>
              <input aria-label="Account number" value={bank.accountNumber} onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })} />
            </label>
            <label>
              <div>BVN</div>
              <input aria-label="BVN" value={bank.bvn} onChange={(e) => setBank({ ...bank, bvn: e.target.value })} />
            </label>
            <button type="submit" disabled={addBank.isPending || updateBank.isPending}>Save Bank</button>
          </form>
        </section>
      </div>
    </AuthGuard>
  );
}

