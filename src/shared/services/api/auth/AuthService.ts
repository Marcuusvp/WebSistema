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

interface INewPassword{
  alterado: boolean
  erros: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {  
    const { data } = await AuthApi.post('/login',{email, password});
    if(data.retorno){      
      return data.retorno;
    }
    else{
      return data.erros;
    }
  } catch (error) {
    return new Error((error as { message: string }).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const forgotPassword = async (email: string): Promise<INewPassword | Error> => {
  try {
    const { data } = await AuthApi.post('/esqueceu-senha', {email});
    if(data.retorno){      
      return data.retorno;
    }
    return new Error('Usuário inválido');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};


export const AuthService = {
  auth,
  forgotPassword,
};