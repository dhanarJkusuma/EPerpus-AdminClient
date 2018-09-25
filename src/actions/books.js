import api from '../api';
import { UPDATE_UPLOADED_COVER_BOOK } from '../types';

export const fetchBook = (page, size) => (dispatch) => api.book.fetch(page, size);
export const createBook = (payload) => (dispatch) =>api.book.create(payload);
export const updateBook = (code, payload) => (dispatch) => api.book.update(code, payload);
export const deleteBook = (code) => (dispatch) => api.book.destroy(code);
export const uploadCoverBook = (code, file, callback) => (dispatch) => api.book.uploadCover(code, file, callback);
export const searchBook = (query, page, size) =>  (dispatch) => api.book.search(query, page, size);
export const updateUploadedCoverBook = (code, coverImage) => {
    return {
      type: UPDATE_UPLOADED_COVER_BOOK,
      payload: {
        code,
        coverImage
      }
    }
}