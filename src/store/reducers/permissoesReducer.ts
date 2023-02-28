export interface PermissaoState {
    permissoes: string[];
}
  
const initialState: PermissaoState = {
  permissoes: []
};
  
export type PermissaoAction = {
    type: 'ADD_PERMISSAO';
    payload: string;
};
  
export const permissaoReducer = (
  state = initialState,
  action: PermissaoAction
): PermissaoState => {
  switch (action.type) {
  case 'ADD_PERMISSAO':
    return {
      ...state,
      permissoes: [...state.permissoes, action.payload]
    };
  default:
    return state;
  }
};
  