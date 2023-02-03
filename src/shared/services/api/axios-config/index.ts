import axios from 'axios';
import { errorInteceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:3333'
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInteceptor(error),
);

export { Api };