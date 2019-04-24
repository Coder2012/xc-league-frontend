import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { run } from './store/configureStore';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
run();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
