import { Environment } from '../../environment';
import { Api } from '../api/axios-config';

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
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);
    if(data){
      return{
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar registros');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {    
    const { data } = await Api.get(`/pessoas/${id}`);
    if(data){
      return data;
    }    
    return new Error('Pessoa não encontrada');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'> ): Promise<number | Error> => {
  try {    
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);
    if(data){
      return data.id;
    } 

    return new Error('Pessoa não encontrada');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {    
    await Api.put(`/pessoas/${id}`, dados);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const deleteById = async (id: number): Promise<any> => {
  try {    
    await Api.delete(`/pessoas/${id}`);
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