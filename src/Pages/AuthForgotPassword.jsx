import React, { useState } from 'react';
import { useForgotPassword } from '../api/queries';
import toast from 'react-hot-toast';

export default function AuthForgotPassword() {
  const [email, setEmail] = useState('');
  const mutation = useForgotPassword();

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(email, {
      onSuccess: () => toast.success('Password reset email sent'),
      onError: () => toast.error('Failed to send reset email'),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit" disabled={mutation.isPending}>Send</button>
      </form>
    </div>
  );
}