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
};
