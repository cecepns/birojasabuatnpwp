import { api } from './api';

export const get = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

export const post = async (url, data = {}) => {
  const response = await api.post(url, data);
  return response.data;
};

export const put = async (url, data = {}) => {
  const response = await api.put(url, data);
  return response.data;
};

export const del = async (url) => {
  const response = await api.delete(url);
  return response.data;
};
