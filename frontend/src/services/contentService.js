import { get, post } from '@/utils/request';
import { API_ENDPOINTS } from '@/utils/endpoints';

export const fetchArticles = (params) =>
  get(API_ENDPOINTS.ARTICLES.LIST, params);

export const fetchArticleBySlug = (slug) =>
  get(API_ENDPOINTS.ARTICLES.DETAIL(slug));

export const submitContact = (data) =>
  post(API_ENDPOINTS.CONTACT.SUBMIT, data);
