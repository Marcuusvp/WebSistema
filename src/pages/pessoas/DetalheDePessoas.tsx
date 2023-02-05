import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/pessoas/PessoaServices';

export const DetalheDePessoas: React.FC = () => {
  const {id = 'cadastro'} = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  
  useEffect(() =>{
    if(id !== 'cadastro'){
      setIsLoading(true);
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error){
            alert(result.message);
            navigate('/pessoas');
          } else{
            setNome(result.nomeCompleto);
            console.log(result);
          }
        });
    }
    return;
  },[id]);

  const handleSave = () => {
    console.log('opa');
  };

  const handleDelete = (id: number) => {
    if(confirm('Deseja deletar esse cliente?')){
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{            
            alert('Registro apagado com sucesso');
            navigate('/pessoas');
          }
        });
    }
  };

  return(
    <LayoutBaseDePagina
      titulo={id ==='cadastro'? 'Cadastrar Cliente': nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Cadastrar Cliente'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'cadastro'}
          mostrarBotaoApagar={id !== 'cadastro'}
          
          aoClicarEmSalvar={() => handleSave}
          aoClicarEmSalvarEFechar={() => handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/cadastro')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <Form onSubmit={console.log}>
        <VTextField
          name='nomeCompleto'/>
      </Form>
      {isLoading &&(
        <LinearProgress variant='indeterminate'/>
      )}
    </LayoutBaseDePagina>
  );
};