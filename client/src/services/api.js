const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Universal API Request Handler
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('cynbit_admin_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.status && err.name === 'TypeError') {
      // Network failure / server offline
      const netError = new Error('Unable to connect to Cynbit API server. Please ensure the backend server is running on port 5000.');
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
};

export const api = {
  // Public Discovery Enquiry Endpoints
  enquiries: {
    create: (data) =>
      request('/enquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    track: (refId) => request(`/enquiries/track/${encodeURIComponent(refId)}`),
  },

  // Admin Authentication
  auth: {
    login: (identifier, password) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      }),
    getMe: () => request('/auth/me'),
  },

  // Admin Protected CRM Endpoints
  admin: {
    getEnquiries: (params = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, val);
        }
      });
      const queryString = query.toString() ? `?${query.toString()}` : '';
      return request(`/admin/enquiries${queryString}`);
    },
    getEnquiryById: (id) => request(`/admin/enquiries/${id}`),
    updateStatus: (id, status, note) =>
      request(`/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, note }),
      }),
    deleteEnquiry: (id) =>
      request(`/admin/enquiries/${id}`, {
        method: 'DELETE',
      }),
    getStats: () => request('/admin/stats'),
  },
};

export default api;
