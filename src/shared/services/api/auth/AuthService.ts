import { AuthApi } from '../axios-config';

interface IAuth{
  token: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {  
    const { data } = await AuthApi.post('/login',{email, password});
    console.log(data);
    if(data){      
      return data;
    } 
  
    return new Error('Usuário/senha inválidos');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};


export const AuthService = {
  auth,
};