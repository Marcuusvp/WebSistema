import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const DetalheDePessoas: React.FC = () => {
  const {id = 'nova'} = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('opa');
  };

  const handleDelete = () => {
    console.log('epa');
  };

  return(
    <LayoutBaseDePagina
      titulo='Cadastrar'
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Cadastrar Cliente'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'cadastro'}
          mostrarBotaoApagar={id !== 'cadastro'}
          
          aoClicarEmSalvar={() => handleSave}
          aoClicarEmSalvarEFechar={() => handleSave}
          aoClicarEmApagar={() => handleDelete}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/cadastro')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >

    </LayoutBaseDePagina>
  );
};