import { get, post, put, patch, del } from '@/utils/request';
import { API_ENDPOINTS } from '@/utils/endpoints';

export const fetchAdminArticles = (params) =>
  get(API_ENDPOINTS.ADMIN.ARTICLES.LIST, params);

export const fetchAdminArticle = (id) =>
  get(API_ENDPOINTS.ADMIN.ARTICLES.DETAIL(id));

export const createArticle = (data) =>
  post(API_ENDPOINTS.ADMIN.ARTICLES.CREATE, data);

export const updateArticle = (id, data) =>
  put(API_ENDPOINTS.ADMIN.ARTICLES.UPDATE(id), data);

export const deleteArticle = (id) =>
  del(API_ENDPOINTS.ADMIN.ARTICLES.DELETE(id));

export const fetchAdminContacts = (params) =>
  get(API_ENDPOINTS.ADMIN.CONTACTS.LIST, params);

export const toggleContactRead = (id, isRead) =>
  patch(API_ENDPOINTS.ADMIN.CONTACTS.READ(id), { is_read: isRead });

export const deleteContact = (id) =>
  del(API_ENDPOINTS.ADMIN.CONTACTS.DELETE(id));
