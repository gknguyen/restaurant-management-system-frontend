import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  /** connect store and reducer */
  const store = createStore(
    rootReducer,
    /** check redux on browser - apply thunk */
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};

export default configureStore;
