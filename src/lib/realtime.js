import { tokenStore } from '../api/http';
let ws = null;
let listeners = [];
let isConnecting = false;
function getWsUrl() {
    const base = import.meta.env.VITE_NOTIFICATIONS_WS_URL;
    if (!base)
        return null;
    const token = tokenStore.access;
    try {
        const url = new URL(base);
        if (token)
            url.searchParams.set('token', token);
        return url.toString();
    }
    catch {
        return null;
    }
}
export function startNotificationsRealtime() {
    if (ws || isConnecting)
        return;
    const url = getWsUrl();
    if (!url)
        return;
    isConnecting = true;
    try {
        ws = new WebSocket(url);
        ws.onopen = () => { isConnecting = false; };
        ws.onmessage = (evt) => {
            try {
                const data = JSON.parse(evt.data);
                listeners.forEach((l) => l(data));
            }
            catch {
                // ignore malformed
            }
        };
        ws.onclose = () => { ws = null; };
        ws.onerror = () => { };
    }
    catch {
        isConnecting = false;
        ws = null;
    }
}
export function subscribeRealtime(listener) {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
}
export function stopNotificationsRealtime() {
    if (ws)
        try {
            ws.close();
        }
        catch { }
    ws = null;
}
