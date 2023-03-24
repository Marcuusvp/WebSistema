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

AuthApi.interceptors.response.use(
  (response) => {
    response.headers['access-control-expose-headers'] = 'x-total-count';
    return response;
  },
  (error) => errorInteceptor(error),
);

export { Api, AuthApi };