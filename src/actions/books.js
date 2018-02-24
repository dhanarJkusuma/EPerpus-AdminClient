import { FETCH_ALL_BOOK } from '../types';
import api from '../api';

export const fetchAllBook = () => (dispatch) =>
  api.book.fetch();
