import React, { Component } from 'react';
import StaticNavbar from './components/common/StaticNavbar';
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import UserDashboard from './components/pages/UserDashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/signin" component={ LoginPage }/>
          <Route path="/dashboard" component={ UserDashboard }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
