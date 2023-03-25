import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField , VForm, useVForm, IVFormErrors} from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/pessoas/PessoaServices';
import * as yup from 'yup';
import { AutocompleteCidades } from './components/AutocompleteCidades';

interface IFormData{
  nomeCompleto: string,
  cidadeId: number,
  email: string,
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
});

export const DetalheDePessoas: React.FC = () => {
  const {id = 'cadastro'} = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  
  useEffect(() =>{
    if(id !== 'cadastro'){
      setIsLoading(true);
      if (isNaN(Number(id))) {
        setIsLoading(false);
        navigate('/cidades');
        return;
      }
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error){
            alert(result.message);
            navigate('/pessoas');
          } else{
            setNome(result.nomeCompleto);
            formRef.current?.setData(result);
          }
        });
    } else{
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: undefined,
      });  
    }
  },[id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema.validate(dados, { abortEarly:false }).then((dadosValidados) => {
      setIsLoading(true);    
      if(id === 'cadastro'){
        PessoasService.create(dadosValidados).then((result) => {
          setIsLoading(false);
          if (result instanceof Error){
            alert(result.message);
          } else {
            if(isSaveAndClose()){
              navigate('/pessoas');
            } else{
              navigate(`/pessoas/detalhe/${result}`);
            }      
          }
        });
      } else{      
        PessoasService.updateById(Number(id), {id:Number(id), ...dadosValidados})
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error){
              alert(result.message);
            } else {          
              if(isSaveAndClose()){
                navigate('/pessoas');
              } 
            }
          });        
      }
    }).catch((errors: yup.ValidationError) => {
      const validationErrors : IVFormErrors = {};
      errors.inner.forEach(error => {
        if (!error.path) return;
        validationErrors[error.path] = error.message;
      });
      formRef.current?.setErrors(validationErrors);
    });
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
          
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmSalvar={save}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/cadastro')}
          aoClicarEmSalvarEFechar={saveAndClose}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">          
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading &&(<Grid item>
              <LinearProgress variant='indeterminate'/>
            </Grid>)}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item md={6}>
                <VTextField label='E-mail' name='email' fullWidth disabled={isLoading}/>
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item md={6}>
                <VTextField onChange={(e) => setNome(e.target.value) } label='Nome Completo' name='nomeCompleto' fullWidth disabled={isLoading}/>
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item md={6}>
                <AutocompleteCidades isExternalLoading={isLoading}/>
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};