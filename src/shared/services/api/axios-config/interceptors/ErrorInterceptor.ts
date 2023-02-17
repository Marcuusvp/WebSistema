import { AxiosError } from 'axios';

//Como essa função não é um componente não usamos letra maiuscula no inicio
export const errorInteceptor = (error: AxiosError) => {
  if(error.message === 'Networ Error'){
    return Promise.reject(new Error('Problema de conexão'));
  }

  if(error.response?.status === 401){
    return Promise.reject(new Error('Falha de autenticação'));
  }

  if(error.response?.status === 400){
    return Promise.reject(new Error('USUÁRIO/SENHA Inválidos'));
  }

  return Promise.reject(error);
};