import React, { Component } from 'react';
import StaticNavbar from './components/common/StaticNavbar';
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import AdminDashboard from './components/pages/AdminDashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/signin" component={ LoginPage }/>
          <Route path="/dashboard" component={ AdminDashboard }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
