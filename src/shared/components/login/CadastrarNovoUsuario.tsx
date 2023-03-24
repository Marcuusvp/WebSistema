import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import { AuthService } from '../../services/api/auth/AuthService';

interface ICadastroProps {
    onSuccess?: () => void;
  }

const cadastroSchema = yup.object().shape({
  userName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
  rePassword: yup.string().required().oneOf([yup.ref('password')], 'As senhas devem corresponder'),
});

export const Cadastro: React.FC<ICadastroProps> = ({ onSuccess }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');


  const handleCadastro = () => {
    setIsLoading(true);
    cadastroSchema
      .validate({ userName, email, password, rePassword }, { abortEarly: false })
      .then((dadosValidados) => {
        AuthService.newUser(dadosValidados)
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Usuário cadastrado com sucesso');
              if (onSuccess) {
                onSuccess();
              }
              // Redirecionar para a tela de login ou outra tela, se necessário
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Ocorreu um erro durante o cadastro. Tente novamente.');
            console.log(error);
          });
      })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach((error) => {
          if (error.path === 'userName') {
            setUserNameError(error.message);
          } else if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          } else if (error.path === 'rePassword') {
            setRePasswordError(error.message);
          }
        });
        setIsLoading(false);
        alert('Por favor, corrija os erros no formulário.');        
      });
  };

  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              Realizar Cadastro
            </Typography>
            <TextField
              fullWidth
              label="Nome de usuário"
              disabled={isLoading}
              value={userName}
              error={!!userNameError}
              helperText={userNameError}
              onKeyDown={() => setUserNameError('')}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              fullWidth
              label="E-mail"
              type="email"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
            />
            <TextField
              fullWidth
              label="Confirme a senha"
              type="password"
              disabled={isLoading}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              error={!!rePasswordError}
              helperText={rePasswordError}
              onKeyDown={() => setRePasswordError('')}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleCadastro}
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} variant='indeterminate' color='inherit' />
                ) : undefined
              }
            >
                  Cadastrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
