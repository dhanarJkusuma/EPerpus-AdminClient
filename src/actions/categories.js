import api from '../api';

export const createCategory = (payload) => (dispatch) =>api.category.create(payload);
export const fetchCategory = () => (dispatch) => api.category.fetch();
export const updateCategory = (code, payload) => (dispatch) => api.category.update(code, payload);
export const deleteCategory = (code) => (dispatch) => api.category.delete(code);