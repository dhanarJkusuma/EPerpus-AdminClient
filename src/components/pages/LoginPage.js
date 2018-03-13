import React, { Component } from 'react';
import StaticNavbar from '../common/StaticNavbar';
import LoginForm from '../forms/LoginForm';
import { adminLogin } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class LoginPage extends Component{
  state = {}

  onLogin = (data) => this.props.adminLogin(data).then(() => this.props.history.push('/dashboard/watch'));


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

export default connect(null, { adminLogin })(LoginPage);
