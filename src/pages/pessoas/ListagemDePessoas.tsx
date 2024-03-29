import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IListagemPessoa, PessoasService } from '../../shared/services/pessoas/PessoaServices';
import { useAuthContext } from '../../shared/contexts';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {debounce} = useDebounce();
  const navigate = useNavigate();
  const { temPermissao } = useAuthContext();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  },[searchParams]);

  useEffect(() => {
    setIsLoading(true); 
    debounce(() => {
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if(result instanceof Error){
          alert(result.message);
          return;
        }
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  },[busca, pagina]);

  const handleDelete = (id: number) => {
    if(confirm('Deseja deletar esse cliente?')){
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{
            setRows(oldRows => {
              return[
                ...oldRows.filter(oldRow => oldRow.id !== id)
                //Filtro simples para reexibir a lista onde os ID's forem diferentes do id informado no delete.
              ];
            });
            alert('Registro apagado com sucesso');
          }
        });
    }
  };

  return(
    <LayoutBaseDePagina
      titulo="Lista de pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarBotaoNovo={temPermissao('ATENDENTE')}
          textoBotaoNovo='Adicionar'
          mostrarInputBusca
          textoDaBusca={busca}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/cadastro')}
          aoMudarTextoDeBusca={texto => setSearchParams({busca: texto, pagina: '1'}, {replace: true})}
        />}>
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width:'auto' }}>
        <Table>
          <TableHead>

            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>

            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}

          </TableBody>
          {totalCount === 0 && !isLoading &&(
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter> 
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (<TableRow>
              <TableCell colSpan={3}>                
                <Pagination
                  page={pagina}
                  count={Math.ceil(totalCount/Environment.LIMITE_DE_LINHAS)}
                  onChange={(e, newPage) => setSearchParams({busca, pagina: newPage.toString()}, {replace: true}) }/>                                
              </TableCell>              
            </TableRow>)}        
            {isLoading && (<TableRow>
              <TableCell colSpan={3}>                
                <LinearProgress variant='indeterminate'/>                                
              </TableCell>              
            </TableRow>)}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};