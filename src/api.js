import axios from 'axios';
import { BASE_URL } from './env';

const headerToken =
  {
    'Content-Type': 'application/json',
    'Authorization': `VEINTECH ${localStorage.eLibraToken}`
  }


function getCredentialsAxios(){
  // Set config defaults when creating the instance
  var instance = axios.create({
    baseURL: `${BASE_URL}`
  });

  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = `VEINTECH ${localStorage.eLibraAdminToken}`;
  return instance;
}

function anonymousAxios(){
  var instance = axios.create({
    baseURL: `${BASE_URL}`
  });
  return instance;
}

export default {
  user: {
    adminLogin: (credentials) => anonymousAxios().post(`/api/v1/auth/admin/login`, credentials).then(res => res.data)
  },
  category: {
    create: (payload) => getCredentialsAxios().post('/api/v1/category', payload),
    fetch: () => getCredentialsAxios().get('/api/v1/category')
  },
  book: {
    create: (payload) => getCredentialsAxios().post('/api/v1/book', payload),
    fetch: () => getCredentialsAxios().get('/api/v1/book').then(res => res.data)
  },
  transaction: {
    create: (payload) => getCredentialsAxios().post('/api/v1/transaction', payload),
    getIncompleteTransaction: () => getCredentialsAxios().get('/api/v1/transaction/in-complete').then(res => res.data),
    getAllIncompleteTransaction: () =>  getCredentialsAxios().get('/api/admin/v1/transaction/in-complete').then(res => res.data),
    getCompleteHistoryTransaction: (start, end) => getCredentialsAxios().get(`/api/admin/v1/transaction/history?from=${start}&to=${end}`).then(res => res.data),
    approveTransaction: (transactionId) => getCredentialsAxios().put(`/api/admin/v1/transaction/${transactionId}/approve`)
  },
  auth: {
    checkToken: (token) => getCredentialsAxios().get(`/api/v1/auth/admin/check-token?token=${token}`).then(res => res.data)
  }
}
