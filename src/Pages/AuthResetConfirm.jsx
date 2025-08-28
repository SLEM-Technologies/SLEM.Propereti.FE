import React, { useState } from 'react';
import { useResetPasswordConfirm } from '../api/queries';
import toast from 'react-hot-toast';

export default function AuthResetConfirm() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useResetPasswordConfirm();

  const onSubmit = (e: any) => {
    e.preventDefault();
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