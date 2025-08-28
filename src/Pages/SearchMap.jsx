import React, { useEffect, useMemo, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSearchProperties } from '../api/queries';

export default function SearchMap() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const SearchParams = useMemo(() => (query ? { q: query } : undefined), [query]);
  const listQuery = useSearchProperties({ PageNumber: page, PageSize: pageSize, SearchParams });

  const items = useMemo(() => {
    const raw = listQuery.data?.data ?? listQuery.data;
    if (Array.isArray(raw)) return raw;
    if (raw?.items) return raw.items;
    return [];
  }, [listQuery.data]);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;
    mapInstance.current = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [3.3792, 6.5244],
      zoom: 9,
    });
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    // Clear previous markers by replacing the container's children markers
    const markers = map.__markers || [];
    markers.forEach((m) => m.remove());
    map.__markers = [];
    items.forEach((p) => {
      const lng = p?.lng ?? p?.longitude ?? p?.location?.lng;
      const lat = p?.lat ?? p?.latitude ?? p?.location?.lat;
      if (typeof lng === 'number' && typeof lat === 'number') {
        const marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);
        map.__markers.push(marker);
      }
    });
    if (items.length > 0) {
      const first = items.find((p) => typeof p?.lng === 'number' && typeof p?.lat === 'number') || items[0];
      const lng = first?.lng ?? first?.longitude ?? first?.location?.lng;
      const lat = first?.lat ?? first?.latitude ?? first?.location?.lat;
      if (typeof lng === 'number' && typeof lat === 'number') map.setCenter([lng, lat]);
    }
  }, [items]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Search Map</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <input aria-label="Query" placeholder="Search..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <button onClick={() => listQuery.refetch()} disabled={listQuery.isLoading}>Search</button>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <button onClick={() => setPage((p) => p + 1)} disabled={items.length < pageSize}>Next</button>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: 480, borderRadius: 8, overflow: 'hidden' }} />
    </div>
  );
}

