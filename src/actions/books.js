import api from '../api';

export const fetchBook = () => (dispatch) => api.book.fetch();
export const createBook = (payload) => (dispatch) =>api.book.create(payload);
export const updateBook = (code, payload) => (dispatch) => api.book.update(code, payload);
export const deleteBook = (code) => (dispatch) => api.book.destroy(code);
export const uploadCoverBook = (code, file, callback) => (dispatch) => api.book.uploadCover(code, file, callback);