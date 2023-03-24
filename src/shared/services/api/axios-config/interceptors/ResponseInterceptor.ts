import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  response.headers['access-control-expose-headers'] = 'x-total-count';
  return response;
};