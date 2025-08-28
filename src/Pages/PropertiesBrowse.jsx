import React from 'react';
import { Link } from 'react-router-dom';
import { usePropertiesList } from '../api/queries';

export default function PropertiesBrowse() {
  const { data, isLoading, error } = usePropertiesList();

  if (isLoading) return <div style={{ padding: 16 }}>Loading properties...</div>;
  if (error) return <div style={{ padding: 16 }}>Failed to load properties.</div>;

  const items = Array.isArray(data?.data) ? data.data : data;

  return (
    <div style={{ padding: 16 }}>
      <h2>Properties</h2>
      <ul>
        {items?.map((p) => (
          <li key={p.id}>
            <Link to={`/properties/${p.id}`}>{p.propertyName || p.title || p.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}