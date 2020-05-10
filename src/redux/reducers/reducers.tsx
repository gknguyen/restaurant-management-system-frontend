import { combineReducers } from 'redux';
import imageReducer from './imageReducers';
import productReducer from './productReducers';
import userReducer from './userReducers';
import productTypeReducer from './productTypeReducers';
import menuTypeReducer from './menuTypeReducers';

// generate reducer for project
const rootReducer = combineReducers({
  productTypeReducer,
  menuTypeReducer,
  productReducer,
  imageReducer,
  userReducer,
});

export default rootReducer;
