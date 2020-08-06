import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { run } from './store/configureStore';

import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
run();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
