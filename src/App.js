import React, { Component } from 'react';
import StaticNavbar from './components/common/StaticNavbar';
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import AdminDashboard from './components/pages/AdminDashboard';
import './App.css';
import store from './store';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
          <Route path="/signin" component={ LoginPage }/>
          <Route path="/dashboard" component={ AdminDashboard }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
