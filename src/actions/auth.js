import api from '../api';

export const adminLogin = (credentials) => (dispatch) =>
  api.user.adminLogin(credentials).then(res => {
    localStorage.eLibraAdminToken = res.token;
  })

export const checkToken = (token, checkToken) => (dispatch) => api.auth.checkToken(token, checkToken);
