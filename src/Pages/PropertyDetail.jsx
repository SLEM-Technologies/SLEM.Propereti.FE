import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyById } from '../api/queries';

export default function PropertyDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = usePropertyById(id);

  if (isLoading) return <div style={{ padding: 16 }}>Loading property...</div>;
  if (error) return <div style={{ padding: 16 }}>Failed to load property.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Property Detail</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {id && (
        <div style={{ marginTop: 12 }}>
          <Link to={`/purchase/${id}`} style={{ textDecoration: 'underline' }}>Purchase this property</Link>
        </div>
      )}
    </div>
  );
}