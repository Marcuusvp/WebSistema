import { Paper, Box, TextField, Button, useTheme, Icon } from '@mui/material';
import { Environment } from '../../environment';


interface IFerramentasDaListagemProps{
    //children: React.ReactNode;
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
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
      component={Paper}>

      {mostrarInputBusca && (<TextField
        value={textoDaBusca}
        onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        size='small'
        placeholder={Environment.INPUT_DE_BUSCA}
      />)}

      <Box flex={1} display='flex' justifyContent='end'>
        {mostrarBotaoNovo && (<Button
          color='primary'
          disableElevation
          variant='contained' 
          onClick={aoClicarEmNovo} 
          endIcon={<Icon>add</Icon>}
        >{textoBotaoNovo}</Button>)}
      </Box>
    </Box>
  );
};