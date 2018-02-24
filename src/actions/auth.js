import { AUTH_LOGIN } from '../types';
import api from '../api';

export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then(res => {
    localStorage.eLibraToken = res.token;
  })
