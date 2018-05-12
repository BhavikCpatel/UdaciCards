import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () =>
  createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
