import React, { Component } from 'react';
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AdminDashboard from './components/pages/AdminDashboard';
import './App.css';


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
