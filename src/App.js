import React, { Component } from 'react';
import Flights from './containers/Flights';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Paragliding XC League</h1>
        </header>
        <Flights />
      </div>
    );
  }
}

export default App;
