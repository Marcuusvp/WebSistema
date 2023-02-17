import { STATUS_CODES } from 'http';
import { AuthApi } from '../axios-config';

interface IPermissao{
  id: number,
  nome: string,
  codigo: string,
}

interface IAuth{
  token: string,
  username: string,
  permissoes: IPermissao[]
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {  
    const { data } = await AuthApi.post('/login',{email, password});
    if(data.retorno){      
      return data.retorno;
    }
    return new Error('Usuário/senha inválidos');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};


export const AuthService = {
  auth,
};