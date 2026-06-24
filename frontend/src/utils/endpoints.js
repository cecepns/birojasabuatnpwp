export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  ARTICLES: {
    LIST: '/api/articles',
    DETAIL: (slug) => `/api/articles/${slug}`,
  },
  CONTACT: {
    SUBMIT: '/api/contact',
  },
  ADMIN: {
    ARTICLES: {
      LIST: '/api/admin/articles',
      DETAIL: (id) => `/api/admin/articles/${id}`,
      CREATE: '/api/admin/articles',
      UPDATE: (id) => `/api/admin/articles/${id}`,
      DELETE: (id) => `/api/admin/articles/${id}`,
    },
    CONTACTS: {
      LIST: '/api/admin/contacts',
      READ: (id) => `/api/admin/contacts/${id}/read`,
      DELETE: (id) => `/api/admin/contacts/${id}`,
    },
  },
};
