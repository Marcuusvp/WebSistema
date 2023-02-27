import {Action} from 'redux';

export const SET_PERMISSOES = 'SET_PERMISSOES';

export interface SetPermissoesAction extends Action<typeof SET_PERMISSOES> {
  payload: string[];
}

export function setPermissoes(permissoes: string[]): SetPermissoesAction {
  return {
    type: SET_PERMISSOES,
    payload: permissoes,
  };
}
