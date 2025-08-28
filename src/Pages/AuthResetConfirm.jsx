import React, { useState } from 'react';
import { useResetPasswordConfirm } from '../api/queries';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({ token: z.string().min(4, 'Token required'), newPassword: z.string().min(6, 'Password must be at least 6 chars') });

export default function AuthResetConfirm() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useResetPasswordConfirm();

  const onSubmit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({ token, newPassword: password });
    if (!parsed.success) {
      toast.error(parsed.error.errors.map((e) => e.message).join(', '));
      return;
    }
    mutation.mutate({ token, newPassword: password }, {
      onSuccess: () => toast.success('Password reset successful'),
      onError: () => toast.error('Failed to reset password'),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
        <button type="submit" disabled={mutation.isPending}>Reset</button>
      </form>
    </div>
  );
}