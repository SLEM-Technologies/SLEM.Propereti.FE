import React from 'react';
import { useUserProfile } from '../api/queries';

export default function Profile() {
  const { data, isLoading, error } = useUserProfile();

  if (isLoading) return <div style={{ padding: 16 }}>Loading profile...</div>;
  if (error) return <div style={{ padding: 16 }}>Failed to load profile.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>My Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}