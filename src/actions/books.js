import api from '../api';

export const fetchBook = () => (dispatch) => api.book.fetch();
export const createBook = (payload) => (dispatch) =>api.book.create(payload);
