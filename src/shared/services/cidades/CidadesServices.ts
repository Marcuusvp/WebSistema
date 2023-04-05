import { Environment } from '../../environment';
import { AuthApi } from '../api/axios-config';

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
}

export interface IListagemCidade{
  id: number;
  nome: string;
  imagemUrl: string;
}

export interface IDetalheCidade{
  id: number;
  nome: string;
  imagem?: File | undefined;
  imagemUrl?: string;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/listar-cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
    const { data, headers } = await AuthApi.get(urlRelativa);
    return {
      data: data.retorno,
      totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
    };
  } catch (error) {
    return new Error('Não foi possível buscar as cidades.');
  }
};


const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {    
    const { data } = await AuthApi.get(`/cidade-por-id/${id}`);
    if(data.retorno){
      return data.retorno;
    }    
    return new Error('Cidade não encontrada');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte'); 
  }
};

const create = async (dados: Omit<IDetalheCidade, 'id'> ): Promise<number | Error> => {
  try {    
    const formData = new FormData();
    formData.append('nome', dados.nome);
    if (dados.imagem) {
      formData.append('imagem', dados.imagem);
    }
    const { data } = await AuthApi.post<IDetalheCidade>('/cadastrar-cidade', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
    const formData = new FormData();
    formData.append('nome', dados.nome);
    if (dados.imagem) {
      formData.append('imagem', dados.imagem);
    }    
    await AuthApi.put(`/atualizar-cidade/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    return new Error((error as {message: string}).message || 'Ocorreu um erro inesperado, contate o suporte');
  }
};


const deleteById = async (id: number): Promise<void | Error> => {
  try {    
    await AuthApi.delete(`/deletar-cidade/${id}`);
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