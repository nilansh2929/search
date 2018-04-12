import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import data from './data.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search data = {data} />
      </div>
    );
  }
}

export default App;
