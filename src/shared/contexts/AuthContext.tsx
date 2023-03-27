import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';
import { AuthApi } from '../services/api/axios-config';
import jwt_decode from 'jwt-decode';

interface IAuthContextData{
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>
  username: string | undefined;
  temPermissao : (nomePermissao:string) => boolean
}

interface IAcessToken {
  unique_name: string;
  role: string[];
  nbf: number;
  exp: number;
  iat: number;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps{
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) =>{
  const [accessToken, setAccessToken] = useState<string>();
  const [permissoesContext, setPermissoesContext] = useState<string[]>([]);
  const [usuario, setUsuario] = useState<string>();
  const [userInfo, setUserInfo] = useState<IAcessToken | null>(null);
  //const SESSION_TIMEOUT = 1 * 60 * 60 * 1000; // Tempo limite da sessão em milissegundos, por exemplo, 1 hora
  const SESSION_TIMEOUT = 30 * 60 * 1000; // Tempo limite da sessão em milissegundos, por exemplo, 1 minuto



  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const permissoesContext = localStorage.getItem('PERMISSOES');
    if(accessToken){
      setAccessToken(JSON.parse(accessToken));
      const decodedToken = jwt_decode<IAcessToken>(accessToken);
      const { unique_name, role, nbf, exp, iat } = decodedToken;
      setUserInfo({ unique_name, role, nbf, exp, iat });
      AuthApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }else{
      setAccessToken(undefined);
      delete AuthApi.defaults.headers.Authorization;
    }
    if(permissoesContext){
      setPermissoesContext(JSON.parse(permissoesContext));
    }else{
      setPermissoesContext([]);  
    }
    checkSessionTimeout();
  },[]);

  //Sempre que se usar uma função que está sendo passada por parâmetro em um contexto, deve-se usar o useCallback
  const handleLogin = useCallback(async(email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if(result instanceof Error){
      return result.message;
    } else{
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token));
      setAccessToken(result.token);
      const decodedToken = jwt_decode<IAcessToken>(result.token);
      const { unique_name, role, nbf, exp, iat } = decodedToken;
      setUserInfo({ unique_name, role, nbf, exp, iat });
      AuthApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setPermissoesContext(result.permissoes.map(permissao => permissao.nome));
      setUsuario(result.username);
      //result.permissoes.forEach(permissao => dispatch(addPermissao(permissao.nome))); => Código mantido para estudo
      localStorage.setItem('PERMISSOES', JSON.stringify(permissoesContext));
      localStorage.setItem('sessionTimestamp', Date.now().toString());
    }
  },[]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    localStorage.removeItem('PERMISSOES');
    localStorage.removeItem('sessionTimestamp');
    setAccessToken(undefined);
  },[]);  

  const checkSessionTimeout = useCallback(() => {
    const sessionTimestamp = localStorage.getItem('sessionTimestamp');
    if (!sessionTimestamp) {
      return;
    }  
    const currentTime = Date.now();
    const elapsedTime = currentTime - parseInt(sessionTimestamp, 10);  
    if (elapsedTime >= SESSION_TIMEOUT) {
      handleLogout();
    }
  }, [handleLogout]);
  

  const handlePermissoes = useCallback((nomePermissao: string) => {
    if (userInfo?.role) {
      return userInfo.role.includes(nomePermissao);
    }
    return false;
  }, [userInfo]);
  
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return(
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, temPermissao: handlePermissoes, username: usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);