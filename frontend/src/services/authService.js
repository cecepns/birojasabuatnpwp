import { get, post } from '@/utils/request';
import { API_ENDPOINTS } from '@/utils/endpoints';

export const login = (data) => post(API_ENDPOINTS.AUTH.LOGIN, data);

export const getProfile = () => get(API_ENDPOINTS.AUTH.PROFILE);
