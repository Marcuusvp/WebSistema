import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentasDaListagem, FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesServices } from '../../shared/services/cidades/CidadesServices';
import { PessoasService } from '../../shared/services/pessoas/PessoaServices';

export const MenuPrincipal = () => {

  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingClientes, setIsLoadingClientes] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountClientes, setTotalCountClientes] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);    
    setIsLoadingClientes(true);    
    CidadesServices.getAll(1).then((result)=> {
      setIsLoadingCidades(false);

      if(result instanceof Error){
        alert(result.message);
      } else{
        setTotalCountCidades(result.totalCount);
      }
    });

    PessoasService.getAll(1).then((result)=> {
      setIsLoadingClientes(false);

      if(result instanceof Error){
        alert(result.message);
      } else{
        setTotalCountClientes(result.totalCount);
      }
    });
  },[]);

  return(
    <LayoutBaseDePagina titulo='Menu Principal' barraDeFerramentas={(
      <FerramentasDaListagem mostrarBotaoNovo={false}/>
    )}>
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={8} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Cidades
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {(!isLoadingCidades &&
                    <Typography variant='h1'>
                      {totalCountCidades}
                    </Typography>)}
                    {(isLoadingCidades &&
                    <Typography variant='h6'>
                      Carregando...
                    </Typography>)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Clientes
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {(!isLoadingClientes &&
                    <Typography variant='h1'>
                      {totalCountClientes}
                    </Typography>)}
                    {(isLoadingClientes &&
                    <Typography variant='h6'>
                    Carregando...
                    </Typography>)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};