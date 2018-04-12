import api from '../api';

export const createCategory = (payload) => (dispatch) =>api.category.create(payload);
export const fetchCategory = () => (dispatch) => api.category.fetch();
