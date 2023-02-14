import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInteceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE
});

const AuthApi = axios.create({
  baseURL: Environment.URL_AUTHAPI
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInteceptor(error),
);

export { Api, AuthApi };