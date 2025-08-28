import React, { useEffect, useState } from 'react';
import { useUserProfile, useUpdateUserProfile } from '../api/queries';
import { z } from 'zod';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Enter a valid email').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export default function Profile() {
  const { data, isLoading, error, refetch } = useUserProfile();
  const update = useUpdateUserProfile();
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', userName: '', phoneNumber: '' });

  useEffect(() => {
    const p = data?.data ?? data;
    if (p) {
      setForm({
        email: p.email || '',
        firstName: p.firstName || '',
        lastName: p.lastName || '',
        userName: p.userName || '',
        phoneNumber: p.phoneNumber || '',
      });
    }
  }, [data]);

  if (isLoading) return <div style={{ padding: 16 }}>Loading profile...</div>;
  if (error) return <div style={{ padding: 16 }}>Failed to load profile.</div>;

  const onSave = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors.map((e) => e.message).join(', '));
      return;
    }
    update.mutate(parsed.data, {
      onSuccess: () => { toast.success('Profile updated'); refetch(); },
      onError: () => toast.error('Failed to update profile')
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>My Profile</h2>
      <form onSubmit={onSave} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
        <label>
          <div>Email</div>
          <input aria-label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          <div>First name</div>
          <input aria-label="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        </label>
        <label>
          <div>Last name</div>
          <input aria-label="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        </label>
        <label>
          <div>Username</div>
          <input aria-label="Username" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
        </label>
        <label>
          <div>Phone</div>
          <input aria-label="Phone" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
        </label>
        <button type="submit" disabled={update.isPending}>Save</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <h3>Raw</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}