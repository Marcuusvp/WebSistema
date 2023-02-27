// reducers/permissoesReducer.ts
import { SetPermissoesAction, SET_PERMISSOES } from '../actions/permissoesActions';

export type PermissoesState = string[];

const initialState: PermissoesState = [];

export default function permissoesReducer(state = initialState, action: SetPermissoesAction): PermissoesState {
  switch (action.type) {
  case SET_PERMISSOES:
    return action.payload;
  default:
    return state;
  }
}

export function temPermissao(state: PermissoesState, permissao: string): boolean {
  return state.includes(permissao);
}
