import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';
import { PermissaoState, permissaoReducer } from './reducers/permissoesReducer';

export interface RootState {
    permissaoState: PermissaoState;
}
  
const rootReducer = combineReducers({
  permissaoState: permissaoReducer,
});
  
const store = createStore(rootReducer);
  
export default store;