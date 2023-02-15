import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts';
import { AuthService } from '../../services/api/auth/AuthService';

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
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    console.log('opa');    
    loginSchema.validate({email, password}, { abortEarly: false}).then(dadosValidados => {
      login(dadosValidados.email, dadosValidados.password);
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

  return(
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
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
           
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>

            <Button 
              variant='contained'
              onClick={handleLogin}
              endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' color='inherit'/> : undefined}
            >
              Login
            </Button>

          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};