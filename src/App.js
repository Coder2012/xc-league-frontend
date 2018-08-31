import React, { Component } from 'react';
import logo from './logo.svg';
import {isSmall, isMedium, isLarge} from './helpers/viewport';
import Flights from './containers/Flights';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Flights />
      </div>
    );
  }
}

export default App;
