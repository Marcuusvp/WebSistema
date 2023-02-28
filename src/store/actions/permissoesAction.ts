import { PermissaoAction } from '../reducers/permissoesReducer';

export const addPermissao = (permissao: string): PermissaoAction => {
  return {
    type: 'ADD_PERMISSAO',
    payload: permissao,
  };
};
  