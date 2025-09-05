import { tokenStore } from '../api/http';

export function isAuthenticated(): boolean {
  const access = tokenStore.access || (typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null);
  return !!access;
}

export function logout(): void {
  try {
    tokenStore.clear();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  } catch {}
}