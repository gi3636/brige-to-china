/** @format */
import { api } from './api';
import useRequest from '@/hooks/useRequest';

export function login(param) {
  return {
    url: 'auth/login',
    method: 'post',
    data: param,
  };
}
export function register(param) {
  return api.post('auth/register', param);
}
