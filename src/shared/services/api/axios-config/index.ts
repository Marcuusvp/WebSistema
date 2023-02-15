import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInteceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  // headers:{
  //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN')|| '')}`,
  // }
});

const AuthApi = axios.create({
  baseURL: Environment.URL_AUTHAPI,  
  // headers:{
  //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN')|| '')}`,
  // }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInteceptor(error),
);

AuthApi.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInteceptor(error),
);

export { Api, AuthApi };