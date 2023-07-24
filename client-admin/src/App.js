import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MyProvider from './contexts/MyProvider';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Login />
        <Router>
          <Main />
        </Router>
      </MyProvider>
    );
  }
}
export default App;