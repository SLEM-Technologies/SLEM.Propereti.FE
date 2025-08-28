export const BASE_URL = 'https://propertyapi.slemtest.com.ng';

// Lightweight API client using fetch with JSON handling and auth token support
export async function apiRequest(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || response.statusText;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Service wrappers for known endpoints
export const AccountsAPI = {
  registerUser(payload) {
    return apiRequest('/api/v1/accounts/register-user', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  verifyEmail(payload) {
    return apiRequest('/api/v1/accounts/verify-email', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  login(payload) {
    return apiRequest('/api/v1/accounts/user-login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export const MetaAPI = {
  getCountries() {
    return apiRequest('/api/v1/countries/get-all-countries', { method: 'GET' });
  },
};

export const UsersAPI = {
  addBankDetails(payload) {
    return apiRequest('/api/v1/users/add-user-bank-details', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export const DocumentsAPI = {
  addDocument(payload) {
    return apiRequest('/api/v1/documents/add-document', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export const AddressAPI = {
  addAddress(payload) {
    return apiRequest('/api/v1/address/add-address', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export const CompaniesAPI = {
  createCompany(payload) {
    return apiRequest('/api/v1/companies/create-company', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  createCompanyAdmin(payload) {
    return apiRequest('/api/v1/companies/create-company-admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// Guessed properties endpoints; will gracefully fail if not available
export const PropertiesAPI = {
  async list(params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
      return await apiRequest(`/api/v1/properties${query ? `?${query}` : ''}`, { method: 'GET' });
    } catch (err) {
      return { data: [] };
    }
  },
  async detail(id) {
    return apiRequest(`/api/v1/properties/${id}`, { method: 'GET' });
  },
};
