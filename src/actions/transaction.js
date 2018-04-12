import api from '../api';

export const getAllIncompleteTransaction = () => (dispatch) => api.transaction.getAllIncompleteTransaction();
export const approveTransaction = (transactionId) => (dispatch) => api.transaction.approveTransaction(transactionId);
export const getCompleteHistoryTransaction = (start, end) => (dispatch) => api.transaction.getCompleteHistoryTransaction(start, end);
