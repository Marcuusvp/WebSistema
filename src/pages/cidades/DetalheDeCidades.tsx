import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField , VForm, useVForm, IVFormErrors} from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesServices } from '../../shared/services/cidades/CidadesServices';
import * as yup from 'yup';

interface IFormData{
  nome: string,
  imagemUrl?: string,
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
  const {id = 'cadastro'} = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [imagem, setImagem] = useState<File | undefined>(undefined);
  const [imagemUrl, setImagemUrl] = useState<string | undefined>(undefined);


  
  useEffect(() =>{
    if(id !== 'cadastro'){
      setIsLoading(true);
      if (isNaN(Number(id))) {
        setIsLoading(false);
        navigate('/cidades');
        return;}
      CidadesServices.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error){
            alert(result.message);
            navigate('/cidades');
          } else{
            setNome(result.nome);
            setImagemUrl(result.imagemUrl);
            formRef.current?.setData(result);
          }
        });
    } else{
      formRef.current?.setData({
        nome: '',
      });  
    }
  },[id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagem(event.target.files[0]);
    }
  };
  
  const handleSave = (dados: IFormData) => {
    formValidationSchema.validate(dados, { abortEarly:false }).then((dadosValidados) => {
      setIsLoading(true);    
      if(id === 'cadastro'){
        CidadesServices.create({ ...dadosValidados, imagem }).then((result) => {
          setIsLoading(false);
          if (result instanceof Error){
            alert(result.message);
          } else {
            if(isSaveAndClose()){
              navigate('/cidades');
            } else{
              navigate(`/cidades/detalhe/${result}`);
            }      
          }
        });
      } else{      
        CidadesServices.updateById(Number(id), { id: Number(id), ...dadosValidados, imagem: imagem})
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error){
              alert(result.message);
            } else {          
              if(isSaveAndClose()){
                navigate('/cidades');
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
      CidadesServices.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{            
            alert('Registro apagado com sucesso');
            navigate('/cidades');
          }
        });
    }
  };

  return(
    <LayoutBaseDePagina
      titulo={id ==='cadastro'? 'Cadastrar Cidade': nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Cadastrar Cidade'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'cadastro'}
          mostrarBotaoApagar={id !== 'cadastro'}
          
          aoClicarEmVoltar={() => navigate('/cidades')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmSalvar={save}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/cadastro')}
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
                <VTextField onChange={(e) => setNome(e.target.value) } label='Cidade' name='nome' fullWidth disabled={isLoading}/>
              </Grid>
            </Grid>

            <Grid item md={6}>
              {imagem && (
                <img
                  src={URL.createObjectURL(imagem)}
                  alt="Imagem da cidade"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}
              {!imagem && id !== 'cadastro' && imagemUrl && (
                <img
                  src={imagemUrl}
                  alt="Imagem da cidade"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
              )}
            </Grid>

            <Grid item md={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-image"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <Button variant="outlined" component="span">
                Enviar imagem
                </Button>
              </label>
              
            </Grid>

          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};