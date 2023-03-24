import { Environment } from '../../environment';
import { AuthApi } from '../api/axios-config';

type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
}

export interface IListagemPessoa{
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export interface IDetalhePessoa{
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/listar-pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const response = await AuthApi.get(urlRelativa, {
      headers: {
        'Access-Control-Expose-Headers': 'x-total-count',
      },
    });
    const totalCount = response.headers['x-total-count'];
    if(response.data.retorno){
      return{
        data: response.data.retorno,
        totalCount: Number(totalCount || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar registros');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {    
    const { data } = await AuthApi.get(`/pessoa-por-id/${id}`);
    if(data.retorno){
      return data.retorno;
    }    
    return new Error('Pessoa não encontrada');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'> ): Promise<boolean | Error> => {
  try {    
    const { data } = await AuthApi.post<IDetalhePessoa>('/cadastrar-pessoa', dados);
    if(data){
      return true;
    } 

    return new Error('Não foi possível realizar o cadastro');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {    
    await AuthApi.put(`/atualizar-pessoa/${id}`, dados);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {    
    await AuthApi.delete(`/deletar-pessoa/${id}`);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};