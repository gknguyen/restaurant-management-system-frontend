import { combineReducers } from 'redux';
import imageReducer from './imageReducers';
import productReducer from './productReducers';
import userReducer from './userReducers';
import productTypeReducer from './productTypeReducers';
import menuTypeReducer from './menuTypeReducers';
import userTypeReducer from './userTypeReducers';

// generate reducer for project
const rootReducer = combineReducers({
  productTypeReducer,
  menuTypeReducer,
  userTypeReducer,
  productReducer,
  imageReducer,
  userReducer,
});

export default rootReducer;
