/** @format */
import { api } from './api';

export function login(param) {
  return api.post('api/auth/login', param);
}
export function register(param) {
  return api.post('api/auth/register', param);
}
