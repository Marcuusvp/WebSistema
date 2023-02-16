import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';
import { AuthApi } from '../services/api/axios-config';

interface IAuthContextData{
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>
  username: string | undefined;
  temPermissao : (nomePermissao:string) => boolean
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps{
  children: React.ReactNode
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) =>{
  const [accessToken, setAccessToken] = useState<string>();
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [usuario, setUsuario] = useState<string>();


  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if(accessToken){
      setAccessToken(JSON.parse(accessToken));
    }else{
      setAccessToken(undefined);  
    }

  },[]);

  //Sempre que se usar uma função que está sendo passada por parâmetro em um contexto, deve-se usar o useCallback
  const handleLogin = useCallback(async(email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if(result instanceof Error){
      return result.message;
    } else{
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token));
      setAccessToken(result.token);
      AuthApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setPermissoes(result.permissoes.map(permissao => permissao.nome));
      setUsuario(result.username);
    }
  },[]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  },[]);

  const handlePermissoes = useCallback((nomePermissao: string) => {
    return permissoes.includes(nomePermissao);
  }, [permissoes]);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return(
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, temPermissao: handlePermissoes, username: usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);