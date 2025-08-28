import React from 'react';
import { useCompaniesList } from '../api/queries';

export default function CompaniesList() {
  const { data, isLoading, error } = useCompaniesList();

  if (isLoading) return <div style={{ padding: 16 }}>Loading companies...</div>;
  if (error) return <div style={{ padding: 16 }}>Failed to load companies.</div>;

  const items = Array.isArray(data?.data) ? data.data : data;

  return (
    <div style={{ padding: 16 }}>
      <h2>Companies</h2>
      <ul>
        {items?.map((c) => (
          <li key={c.id}>{c.name || c.companyName || c.id}</li>
        ))}
      </ul>
    </div>
  );
}