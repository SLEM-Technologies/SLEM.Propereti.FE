import React, { useMemo, useState } from 'react';
import { useSearchProperties, useSearchSuggest, useSearchNearby } from '../api/queries';

export default function SearchProperties() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radiusKm, setRadiusKm] = useState('');

  const SearchParams = useMemo(() => {
    const params = {};
    if (query) params.q = query;
    return params;
  }, [query]);

  const listQuery = useSearchProperties({ PageNumber: page, PageSize: pageSize, SearchParams, sort: sort || undefined });
  const suggestQuery = useSearchSuggest(query, 5);
  const nearbyQuery = useSearchNearby({ lat: lat ? Number(lat) : undefined, lng: lng ? Number(lng) : undefined, radiusKm: radiusKm ? Number(radiusKm) : undefined, page, pageSize });

  const items = Array.isArray(listQuery.data?.data) ? listQuery.data.data : (listQuery.data?.items || listQuery.data || []);
  const nearbyItems = Array.isArray(nearbyQuery.data?.data) ? nearbyQuery.data.data : (nearbyQuery.data?.items || []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Search Properties</h2>

      <div style={{ display: 'grid', gap: 8, maxWidth: 700, marginBottom: 12 }}>
        <label>
          <div>Query</div>
          <input aria-label="Query" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search..." />
        </label>
        {suggestQuery.data && (suggestQuery.data.items || suggestQuery.data)?.length > 0 && (
          <div style={{ fontSize: 12, color: '#666' }}>
            Suggestions: {(suggestQuery.data.items || suggestQuery.data).map((s, idx) => <span key={idx} style={{ marginRight: 8 }}>{s}</span>)}
          </div>
        )}
        <label>
          <div>Sort</div>
          <input aria-label="Sort" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} placeholder="e.g. price_asc" />
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label>
            <div>Lat</div>
            <input aria-label="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="lat" />
          </label>
          <label>
            <div>Lng</div>
            <input aria-label="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="lng" />
          </label>
          <label>
            <div>Radius (km)</div>
            <input aria-label="Radius" value={radiusKm} onChange={(e) => setRadiusKm(e.target.value)} placeholder="10" />
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px' }}>
          <h3>Results</h3>
          {listQuery.isLoading && <div>Loading search results...</div>}
          {listQuery.isError && <div>Failed to search properties</div>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items?.map((p) => (
              <li key={p?.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{p?.propertyName || p?.title || p?.id}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{p?.propertyAddress || p?.address || ''}</div>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || listQuery.isLoading}>Prev</button>
            <div>Page {page}</div>
            <button onClick={() => setPage((p) => p + 1)} disabled={items?.length < pageSize || listQuery.isLoading}>Next</button>
          </div>
        </div>

        <div style={{ flex: '1 1 320px' }}>
          <h3>Nearby</h3>
          {nearbyQuery.isFetching && <div>Loading nearby...</div>}
          {nearbyQuery.isError && <div>Failed to load nearby</div>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {nearbyItems?.map((p, idx) => (
              <li key={p?.id || idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{p?.propertyName || p?.title || p?.id}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{p?.propertyAddress || p?.address || ''}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

