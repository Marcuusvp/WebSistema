import { Box, Button, Icon, Paper, useTheme, Divider, Skeleton } from '@mui/material';

interface IFerramentasDeDetalheProps{
  textoBotaoNoto?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

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

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

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
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (<Button
        color='primary'
        disableElevation
        variant='contained' 
        onClick={aoClicarEmSalvar}
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>)}

      {mostrarBotaoSalvarCarregando &&
      (<Skeleton width={110} height={65}/>)}

      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && (<Button
        color='primary'
        disableElevation
        variant='contained'
        onClick={aoClicarEmSalvarEFechar} 
        startIcon={<Icon>save</Icon>}
      >Salvar e voltar</Button>)}

      {mostrarBotaoSalvarEFecharCarregando && 
      (<Skeleton width={180} height={65}/>)}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicarEmApagar} 
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>)}
      
      {mostrarBotaoApagarCarregando &&
      (<Skeleton width={110} height={65}/>)}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) &&(<Button
        color='primary'
        disableElevation
        variant='outlined' 
        onClick={aoClicarEmNovo}
        startIcon={<Icon>add</Icon>}
      >{textoBotaoNoto}</Button>)} 

      {mostrarBotaoNovoCarregando &&
      (<Skeleton width={110} height={65}/>)}

      <Divider variant='middle' orientation='vertical'/>

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&(<Button
        color='primary'
        disableElevation
        variant='outlined' 
        onClick={aoClicarEmVoltar}
        startIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>)}

      {mostrarBotaoVoltarCarregando &&
      (<Skeleton width={110} height={65}/>)}

    </Box>
  );
};