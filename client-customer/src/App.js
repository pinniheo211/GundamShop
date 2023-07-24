import './App.css';
import React, { Component } from 'react';
import Main from './components/MainComponent';
import {BrowserRouter as Router} from 'react-router-dom';
import MyProvider from './contexts/MyProvider';
class App extends Component {
  render() {
    return (
      <MyProvider>
        <Router>
          <Main />
        </Router>
      </MyProvider>
    );
  }
}
export default App;