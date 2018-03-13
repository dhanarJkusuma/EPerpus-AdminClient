import { AUTH_LOGIN } from '../types';
import api from '../api';

export const adminLogin = (credentials) => (dispatch) =>
  api.user.adminLogin(credentials).then(res => {
    localStorage.eLibraToken = res.token;
  })
