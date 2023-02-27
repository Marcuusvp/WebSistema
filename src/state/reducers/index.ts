// reducers/index.ts
import { combineReducers } from 'redux';
import permissoesReducer from './permissoesReducer';

const rootReducer = combineReducers({
  permissoes: permissoesReducer,
});

export default rootReducer;
