import { tokenStore } from '../api/http';

type Listener = (payload: any) => void;

let ws: WebSocket | null = null;
let listeners: Listener[] = [];
let isConnecting = false;

function getWsUrl(): string | null {
  const base = import.meta.env.VITE_NOTIFICATIONS_WS_URL as string | undefined;
  if (!base) return null;
  const token = tokenStore.access;
  try {
    const url = new URL(base);
    if (token) url.searchParams.set('token', token);
    return url.toString();
  } catch {
    return null;
  }
}

export function startNotificationsRealtime() {
  if (ws || isConnecting) return;
  const url = getWsUrl();
  if (!url) return;
  isConnecting = true;
  try {
    ws = new WebSocket(url);
    ws.onopen = () => { isConnecting = false; };
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        listeners.forEach((l) => l(data));
      } catch {
        // ignore malformed
      }
    };
    ws.onclose = () => { ws = null; };
    ws.onerror = () => { /* noop */ };
  } catch {
    isConnecting = false;
    ws = null;
  }
}

export function subscribeRealtime(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function stopNotificationsRealtime() {
  if (ws) try { ws.close(); } catch {}
  ws = null;
}

