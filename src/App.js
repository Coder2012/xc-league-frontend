import React, { Component } from 'react';
import Header from './components/Header';
import Flights from './containers/Flights/index';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Flights />
      </div>
    );
  }
}

export default App;
