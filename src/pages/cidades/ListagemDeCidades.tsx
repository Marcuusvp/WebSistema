import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  return(
    <LayoutBaseDePagina
      titulo="Lista de cidades"
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