import { combineReducers } from 'redux';
import imageReducer from './imageReducers/reducer';
import productReducer from './productReducers/reducer';
import userReducer from './userReducers/reducer';
import productTypeReducer from './productTypeReducers/reducer';
import menuTypeReducer from './menuTypeReducers/reducer';
import userTypeReducer from './userTypeReducers/reducer';

/** generate reducer for project */
const rootReducer = combineReducers({
  productTypeReducer,
  menuTypeReducer,
  userTypeReducer,
  productReducer,
  imageReducer,
  userReducer,
});

export default rootReducer;
