import { Environment } from '../../environment';
import { Api } from '../api/axios-config';

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
}

export interface IListagemCidade{
  id: number;
  nome: string;
}

export interface IDetalheCidade{
  id: number;
  nome: string;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {    
    const { data } = await Api.get(`/cidades/${id}`);
    if(data){
      return data;
    }    
    return new Error('Cidade não encontrada');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const create = async (dados: Omit<IDetalheCidade, 'id'> ): Promise<number | Error> => {
  try {    
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);
    if(data){
      return data.id;
    } 

    return new Error('Cidade não encontrada');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
  try {    
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {    
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

export const CidadesServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};