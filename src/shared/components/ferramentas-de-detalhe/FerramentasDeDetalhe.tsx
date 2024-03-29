import { Box, Button, Icon, Paper, useTheme, Divider, Skeleton, Typography, useMediaQuery } from '@mui/material';

interface IFerramentasDeDetalheProps{
  textoBotaoNovo?: string;
  textoBotaoGit?: string;
  textoBotaoGitFront?: string;

  mostrarBotaoGit?: boolean;
  mostrarBotaoGitFront?: boolean;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoGitCarregando?: boolean;
  mostrarBotaoGitFrontCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  
  aoClicarEmGit?: () => void;
  aoClicarEmGitFront?: () => void;
  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo: textoBotaoNovo = 'Novo',
  textoBotaoGit: textoBotaoGit = '',
  textoBotaoGitFront: textoBotaoGitFront = '',

  mostrarBotaoNovo = true,
  mostrarBotaoGit = false,
  mostrarBotaoGitFront = false,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,
  mostrarBotaoGitCarregando = false,
  mostrarBotaoGitFrontCarregando = false,
  
  aoClicarEmGit,
  aoClicarEmGitFront,
  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      >
        <Typography variant='button' noWrap>
        Salvar
        </Typography>
      </Button>)}

      {mostrarBotaoSalvarCarregando &&
      (<Skeleton width={110} height={65}/>)}

      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (<Button
        color='primary'
        disableElevation
        variant='contained'
        onClick={aoClicarEmSalvarEFechar} 
        startIcon={<Icon>save</Icon>}
      >
        <Typography variant='button' noWrap>
        Salvar e fechar
        </Typography>
      </Button>)}

      {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && 
      (<Skeleton width={180} height={65}/>)}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        onClick={aoClicarEmApagar} 
        startIcon={<Icon>delete</Icon>}
      >
        <Typography variant='button' noWrap>
        Apagar
        </Typography>
      </Button>)}
      
      {mostrarBotaoApagarCarregando &&
      (<Skeleton width={110} height={65}/>)}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) &&(<Button
        color='primary'
        disableElevation
        variant='outlined' 
        onClick={aoClicarEmNovo}
        startIcon={<Icon>add</Icon>}
      >
        <Typography variant='button' noWrap>
          {textoBotaoNovo}
        </Typography>
      </Button>)} 

      {(mostrarBotaoNovoCarregando && !smDown) &&
      (<Skeleton width={110} height={65}/>)}

      {(
        mostrarBotaoVoltar &&
        (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
      ) && (
        <Divider variant='middle' orientation='vertical'/>
      )}

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&(<Button
        color='primary'
        disableElevation
        variant='outlined' 
        onClick={aoClicarEmVoltar}
        startIcon={<Icon>arrow_back</Icon>}
      >
        <Typography variant='button' noWrap>
        Voltar
        </Typography>
      </Button>)}

      {mostrarBotaoVoltarCarregando &&
      (<Skeleton width={110} height={65}/>)}

      {mostrarBotaoGit && !mostrarBotaoGitCarregando && (
        <Button
          color="secondary"
          disableElevation
          variant="contained"
          onClick={aoClicarEmGit}
          startIcon={<Icon>terminal</Icon>}
        >
          <Typography variant="button" noWrap>
            {textoBotaoGit}
          </Typography>
        </Button>
      )}

      {mostrarBotaoGitCarregando && <Skeleton width={110} height={65} />}

      {mostrarBotaoGitFront && !mostrarBotaoGitFrontCarregando && (
        <Button
          color="secondary"
          disableElevation
          variant="contained"
          onClick={aoClicarEmGitFront}
          startIcon={<Icon>terminal</Icon>}
        >
          <Typography variant="button" noWrap>
            {textoBotaoGitFront}
          </Typography>
        </Button>
      )}

      {mostrarBotaoGitFrontCarregando && <Skeleton width={110} height={65} />}

    </Box>
  );
};