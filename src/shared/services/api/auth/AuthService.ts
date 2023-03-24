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

interface IUser{
  userName: string
  email: string
  password: string
  rePassword: string
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

const newUser = async (user: IUser): Promise<boolean | Error> => {
  try {
    const { data } = await AuthApi.post('/cadastrar', user);
    if(data.retorno){      
      return data.retorno;
    }
    return new Error('Erro ao efetuar cadastro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};


export const AuthService = {
  auth,
  forgotPassword,
  newUser,
};