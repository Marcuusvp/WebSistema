import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/pessoas/PessoaServices';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {debounce} = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(() => {
    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        if(result instanceof Error){
          alert(result.message);
          return;
        }
        console.log(result);
      });
    });
  },[busca]);

  return(
    <LayoutBaseDePagina
      titulo="Lista de pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Adicionar'
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({busca: texto}, {replace: true})}
        />}>
    </LayoutBaseDePagina>
  );
};