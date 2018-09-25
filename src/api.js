import axios from 'axios';
import { BASE_URL } from './env';


function getCredentialsAxios(){
  // Set config defaults when creating the instance
  var instance = axios.create({
    baseURL: `${BASE_URL}`
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Do something with response error
      if (error.response.status === 401) {
          localStorage.clear();
      }
      return Promise.reject(error.response);
    });
  // Alter defaults after instance has been created
  if(localStorage.eLibraAdminToken != null){
    instance.defaults.headers.common['Authorization'] = `BEEHIVE ${localStorage.eLibraAdminToken}`;
  }

  return instance;
}

function anonymousAxios(){
  var instance = axios.create({
    baseURL: `${BASE_URL}`
  });
  console.log(localStorage.eLibraAdminToken)
  return instance;
}

function wrapFileCoverBook(file){
  const formData = new FormData()
  formData.append('cover', file, file.name)
  return formData;
}

export default {
  user: {
    adminLogin: (credentials) => anonymousAxios().post(`/api/v1/auth/admin/login`, credentials).then(res => res.data)
  },
  category: {
    create: (payload) => getCredentialsAxios().post('/api/v1/category', payload),
    fetch: () => getCredentialsAxios().get('/api/v1/category'),
    update: (code, payload) => getCredentialsAxios().put(`/api/v1/category/${code}`, payload),
    delete: (code) => getCredentialsAxios().delete(`/api/v1/category/${code}`)
  },
  book: {
    search: (query, page, size) => getCredentialsAxios().get(`/api/v1/book/search?query=` + query + `&page=` + page + `&size=` + size).then(res => res.data),
    create: (payload) => getCredentialsAxios().post('/api/v1/book', payload),
    fetch: (page, size) => getCredentialsAxios().get(`/api/v1/book?page=${page}&size=${size}`).then(res => res.data),
    update: (code, payload) => getCredentialsAxios().put(`/api/v1/book/${code}`, payload),
    destroy: (code) => getCredentialsAxios().delete(`/api/v1/book/${code}`),
    uploadCover: (code, file, callback) => getCredentialsAxios().post(`/api/v1/book/upload/${code}`, wrapFileCoverBook(file), {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        callback(percentCompleted);
      }
    })
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
