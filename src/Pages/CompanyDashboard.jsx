import React, { useMemo, useState } from 'react';
import { useUserProfile, useCompanyMembers, useSearchProperties } from '../api/queries';
import RoleGuard from '../components/RoleGuard.tsx';

export default function CompanyDashboard() {
  const profile = useUserProfile();
  const companyId = (profile.data?.companyId || profile.data?.data?.companyId || '').toString();
  const membersQuery = useCompanyMembers(companyId || undefined);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  // My listings: filter by company if backend correlates; fallback to global list
  const propsQuery = useSearchProperties({ PageNumber: page, PageSize: pageSize, SearchParams: companyId ? { companyId } : undefined });

  const members = useMemo(() => {
    const raw = membersQuery.data?.data ?? membersQuery.data;
    return Array.isArray(raw) ? raw : (raw?.items || []);
  }, [membersQuery.data]);

  const listings = useMemo(() => {
    const raw = propsQuery.data?.data ?? propsQuery.data;
    if (Array.isArray(raw)) return raw;
    if (raw?.items) return raw.items;
    return [];
  }, [propsQuery.data]);

  return (
    <RoleGuard allow={["company","admin"]}>
      <div style={{ padding: 16 }}>
        <h2>Company Dashboard</h2>

        <section style={{ marginBottom: 16 }}>
          <h3>Team Members</h3>
          {membersQuery.isLoading && <div>Loading members...</div>}
          {membersQuery.isError && <div>Failed to load members</div>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {members.map((m, idx) => (
              <li key={m?.id || idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8, marginBottom: 6 }}>
                {m?.email || m?.name || m?.userName || m?.id}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>My Listings</h3>
          {propsQuery.isLoading && <div>Loading listings...</div>}
          {propsQuery.isError && <div>Failed to load listings</div>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {listings.map((p, idx) => (
              <li key={p?.id || idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8, marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{p?.propertyName || p?.title || p?.id}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{p?.propertyAddress || p?.address || ''}</div>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => setPage((v) => Math.max(1, v - 1))} disabled={page === 1 || propsQuery.isLoading}>Prev</button>
            <div>Page {page}</div>
            <button onClick={() => setPage((v) => v + 1)} disabled={listings.length < pageSize || propsQuery.isLoading}>Next</button>
          </div>
        </section>
      </div>
    </RoleGuard>
  );
}

