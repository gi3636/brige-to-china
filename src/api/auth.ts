/** @format */

export function login(param) {
  return {
    url: 'auth/login',
    method: 'post',
    data: param,
  };
}
export function register(param) {
  return {
    url: 'auth/register',
    method: 'post',
    data: param,
  };
}
