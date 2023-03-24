import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInteceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

const AuthApi = axios.create({
  baseURL: Environment.URL_AUTHAPI,
  headers: {
    common: {
      'Access-Control-Expose-Headers': 'x-total-count',
    },
  }, 
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInteceptor(error),
);

AuthApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('APP_ACCESS_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

AuthApi.interceptors.response.use(
  (response) => {
    response.headers['access-control-expose-headers'] = 'x-total-count';
    return response;
  },
  (error) => errorInteceptor(error),
);

export { Api, AuthApi };