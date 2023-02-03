import { FerramentasDaListagem, FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const MenuPrincipal = () => {

  return(
    <LayoutBaseDePagina titulo='Menu Principal' barraDeFerramentas={(
      <FerramentasDeDetalhe mostrarBotaoSalvarEFechar/>
    )}>
      Testinho
    </LayoutBaseDePagina>
  );
};