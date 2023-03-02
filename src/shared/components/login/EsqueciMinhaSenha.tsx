import { Box, Button, Card, CardActions, CardContent, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import { AuthService } from '../../services/api/auth/AuthService';
import { Login } from './Login';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const EsqueciMinhaSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleNewPassword = () => { 
    loginSchema.validate({email}, { abortEarly: false}).then(dadosValidados => {
      AuthService.forgotPassword(dadosValidados.email).then(result => {
        if(result !== undefined){
          setEmailError('Usuário inválido'); 
        }
        setShowLogin(true);
      });
    }).catch((errors:yup.ValidationError) => {
      errors.inner.forEach(error => {
        if(error.path === 'email'){
          setEmailError(error.message);
        }
      });
    });
  };

  const retornarLogin = () =>{
    setShowLogin(true);
  };

  return(
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      {showLogin ? (<Login>{}</Login>) : (<Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>

            <Typography variant='h6' align='center'>
              Esqueci minha senha
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
           
            <Link alignSelf='center' onClick={retornarLogin}>Cancelar</Link>
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button 
              variant='contained'
              onClick={handleNewPassword}
              endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' color='inherit'/> : undefined}
            >
              Alterar Senha
            </Button>

          </Box>
        </CardActions>
      </Card>)}
    </Box>
  );
};