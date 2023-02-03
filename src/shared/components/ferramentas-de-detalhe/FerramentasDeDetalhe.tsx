import { Box, Button, Icon, Paper, useTheme, Divider } from '@mui/material';

interface IFerramentasDeDetalheProps{
  textoBotaoNoto?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNoto = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();

  return(
    <Box
      gap={1} 
      marginX={1}
      padding={1}
      paddingX={1}
      display='flex'
      alignItems="center"
      height={theme.spacing(5)} 
      component={Paper}
    >
      {mostrarBotaoSalvar && (<Button
        color='primary'
        disableElevation
        variant='contained' 
        onClick={aoClicarEmSalvar}
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>)}

      {mostrarBotaoSalvarEFechar && (<Button
        color='primary'
        disableElevation
        variant='contained'
        onClick={aoClicarEmSalvarEFechar} 
        startIcon={<Icon>save</Icon>}
      >Salvar e voltar</Button>)}

      {mostrarBotaoApagar && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicarEmApagar} 
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>)}

      {mostrarBotaoNovo &&(<Button
        color='primary'
        disableElevation
        variant='outlined' 
        onClick={aoClicarEmNovo}
        startIcon={<Icon>add</Icon>}
      >{textoBotaoNoto}</Button>)} 

      <Divider variant='middle' orientation='vertical'/>

      {mostrarBotaoVoltar &&(<Button
        color='primary'
        disableElevation
        variant='outlined' 
        onClick={aoClicarEmVoltar}
        startIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>)}
    </Box>
  );
};