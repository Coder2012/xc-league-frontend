import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

import Header from './components/Header';
import Flights from './containers/Flights/index';
import Styles from './App.module.css';
import ReactGA from 'react-ga';

class App extends Component {
  componentDidMount() {
    Sentry.init({dsn: "https://c59644d1c05645f0b81702d9dd38af59@sentry.io/1545393"});

    ReactGA.initialize('UA-143319467-1');
    ReactGA.pageview('/app');
  }
  render() {
    return (
      <div className={Styles.App}>
        <Header />
        <Flights />
      </div>
    );
  }
}

export default App;
