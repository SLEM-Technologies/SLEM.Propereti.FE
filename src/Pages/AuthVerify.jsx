import React, { useState } from 'react';
import { useVerifyEmail, useVerifyPhone, useResendEmailVerification } from '../api/queries';
import toast from 'react-hot-toast';

export default function AuthVerify() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const verifyEmail = useVerifyEmail();
  const verifyPhone = useVerifyPhone();
  const resendEmail = useResendEmailVerification();

  return (
    <div style={{ padding: 16 }}>
      <h2>Verify Account</h2>

      <div style={{ marginBottom: 16 }}>
        <h3>Email</h3>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={() => verifyEmail.mutate({ email, otpCode: otp }, { onSuccess: () => toast.success('Email verified'), onError: () => toast.error('Failed') })}>
          Verify Email
        </button>
        <button onClick={() => resendEmail.mutate({ email }, { onSuccess: () => toast.success('Verification email resent'), onError: () => toast.error('Failed') })}>
          Resend Email
        </button>
      </div>

      <div>
        <h3>Phone</h3>
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={() => verifyPhone.mutate({ phoneNumber: phone, otpCode: otp }, { onSuccess: () => toast.success('Phone verified'), onError: () => toast.error('Failed') })}>
          Verify Phone
        </button>
      </div>
    </div>
  );
}