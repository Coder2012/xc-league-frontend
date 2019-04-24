import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

import createSagaMiddleware from 'redux-saga';
import mySaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

// then run the saga
const run = () => sagaMiddleware.run(mySaga);

export default function configureStore() {
  return store;
}

export { run };
