import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import StaticNavbar from '../common/StaticNavbar';
import LoginForm from '../forms/LoginForm';
import { adminLogin } from '../../actions/auth';

// actions
import { checkToken } from '../../actions/auth';


class LoginPage extends Component{
  state = {}

  onLogin = (data) => this.props.adminLogin(data).then(() => this.props.history.push('/dashboard/watch'));

  componentWillMount = () => {
    this.checkToken();
  }

  checkToken = () => {
    var token = localStorage.getItem('eLibraAdminToken');
    if(typeof token != 'undefined' && token != null){
      // checkToken
      this.props.checkToken(token).then(res => {
        // success
        this.props.history.push('/dashboard/watch');
      }).catch(err => {
        // forbidden
        // do nothing
      })
    }
  }

  render(){
    return (
      <div>
        <StaticNavbar title="E-Libra | Admin | Sign In Page" />

        <LoginForm submit={ this.onLogin } />
      </div>
    );
  }
}

LoginPage.propType = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, { adminLogin, checkToken })(LoginPage);
