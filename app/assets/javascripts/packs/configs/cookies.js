import { Cookies } from 'react-cookie';

const expires = new Date();
expires.setDate(expires.getDate() + 60);

const theCookies = new Cookies();
const options = {
  path: '/',
  expires,
  sameSite: 'strict',
};

const setAccessToken = (access_token = false) => {
  if (access_token) theCookies.set('access_token', access_token, options);
  return false;
};

const setRefreshToken = refresh_token => {
  if (refresh_token) theCookies.set('refresh_token', refresh_token, options);
  return false;
};

const getAccessToken = () => theCookies.get('access_token');
const getRefreshToken = () => theCookies.get('refresh_token');

const clearAccessToken = () => theCookies.remove('access_token', { path: '/' });
const clearRefreshToken = () => theCookies.remove('refresh_token', { path: '/' });

const clearCookies = () => {
  clearAccessToken();
  clearRefreshToken();
};

const cookies = {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearCookies,
}

export default cookies