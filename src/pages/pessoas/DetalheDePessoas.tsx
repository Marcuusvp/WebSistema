import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/pessoas/PessoaServices';

interface IFormData{
  nomeCompleto: string,
  cidadeId: number,
  email: string,
}

export const DetalheDePessoas: React.FC = () => {
  const {id = 'cadastro'} = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const formRef = useRef<FormHandles>(null);
  
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

  const handleSave = (dados: IFormData) => {
    console.log(dados);
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
          
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => () => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/cadastro')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField
          name='nomeCompleto'/>
        <VTextField
          name='email'/>
        <VTextField
          name='cidadeId'/>
      </Form>

      {isLoading &&(
        <LinearProgress variant='indeterminate'/>
      )}

    </LayoutBaseDePagina>
  );
};