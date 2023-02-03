import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const MenuPrincipal = () => {

  return(
    <LayoutBaseDePagina titulo='Menu Principal' barraDeFerramentas={(
      <FerramentasDaListagem mostrarInputBusca textoBotaoNovo='Cadastrar'/>
    )}>
      Testinho
    </LayoutBaseDePagina>
  );
};