import React, { useState } from 'react';
import { useForgotPassword } from '../api/queries';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({ email: z.string().email('Enter a valid email') });

export default function AuthForgotPassword() {
  const [email, setEmail] = useState('');
  const mutation = useForgotPassword();

  const onSubmit = (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.errors.map((e) => e.message).join(', '));
      return;
    }
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