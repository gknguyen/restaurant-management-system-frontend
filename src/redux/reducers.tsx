import { combineReducers } from 'redux';
import imageReducer from './imageReducers/reducer';
import productReducer from './productReducers/reducer';
import userReducer from './userReducers/reducer';
import productTypeReducer from './productTypeReducers/reducer';
import menuTypeReducer from './menuTypeReducers/reducer';
import userTypeReducer from './userTypeReducers/reducer';
import commonReducer from './commonReducers/reducer';

/** generate reducer for project */
const rootReducer = combineReducers({
  commonReducer,
  productTypeReducer,
  menuTypeReducer,
  userTypeReducer,
  productReducer,
  imageReducer,
  userReducer,
});

export default rootReducer;
