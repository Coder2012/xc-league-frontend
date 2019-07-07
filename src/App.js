import React, { Component } from 'react';
import Header from './components/Header';
import Flights from './containers/Flights/index';
import Styles from './App.module.css';
import ReactGA from 'react-ga';

class App extends Component {
  componentDidMount() {
    ReactGA.initialize('UA-123791717-1');
    ReactGA.pageview('/homepage');
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
