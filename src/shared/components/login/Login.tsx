import { Box, Button, Card, CardActions, CardContent, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts';
import { Cadastro } from './CadastrarNovoUsuario';
import { EsqueciMinhaSenha } from './EsqueciMinhaSenha';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

interface ILoginProps{
  children: React.ReactNode
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [isLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  const handleLogin = () => {
    setShowForgotPassword(false);
    loginSchema.validate({email, password}, { abortEarly: false}).then(dadosValidados => {
      login(dadosValidados.email, dadosValidados.password).then(result => {
        if(result !== undefined){
          setEmailError(result);
          setPasswordError(result);
        }});
    }).catch((errors:yup.ValidationError) => {
      errors.inner.forEach(error => {
        if(error.path === 'email'){
          setEmailError(error.message);
        }else if(error.path === 'password'){
          setPasswordError(error.message);
        }
      });
    });
  };

  if(isAuthenticated) return(
    <>{children}</>
  );

  const esqueciMinhaSenha = () =>{
    setShowForgotPassword(true);
  };

  return(
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      {showForgotPassword ? (
        <EsqueciMinhaSenha />
      ) : showRegister ? (
        <Cadastro onSuccess={() => setShowRegister(false)}/> // Adicione esta linha
      ) : (
        <Card>
          <CardContent>
            <Box display='flex' flexDirection='column' gap={2} width={250}>

              <Typography variant='h6' align='center'>
              Realizar Login
              </Typography>
              <TextField fullWidth 
                label='E-mail' 
                type='email'
                disabled={isLoading}             
                value={email} 
                onChange={e => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={() => setEmailError('')}/>

              <TextField fullWidth 
                label='Senha'
                disabled={isLoading}
                type='password'
                value={password} 
                onChange={e => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={() => setPasswordError('')}/>
           
              <Link alignSelf='center' onClick={esqueciMinhaSenha} style={{ cursor: 'pointer' }}>Esqueci minha senha</Link>
            </Box>
          </CardContent>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center' gap={2}>
              <Button 
                variant='contained'
                onClick={handleLogin}
                endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' color='inherit'/> : undefined}
              >
              Login
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowRegister(true)}
                endIcon={
                  isLoading ? (
                    <CircularProgress size={20} variant="indeterminate" color="inherit" />
                  ) : undefined
                }
              >
              Cadastrar
              </Button>
            </Box>
          </CardActions>
        </Card>)}
    </Box>
  );
};