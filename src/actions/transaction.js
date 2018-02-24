import {
  ADD_CART,
  REPLACE_STOCK_CART,
  DELETE_CART,
  CLEAR_CART,
  UPDATE_PENDING_TRANSACTION
} from '../types';
import api from '../api';

export const addCart = (cart) => {
  return{
    type: ADD_CART,
    payload: cart
  }
}

export const replaceStockCart = (index, quantity) => {
  return{
    type: REPLACE_STOCK_CART,
    payload: {
      index,
      quantity
    }
  }
}

export const deleteCart = (index) => {
  return {
    type: DELETE_CART,
    payload: {
      index
    }
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const updatePendingTrx = (trxCount) => {
  return {
    type: UPDATE_PENDING_TRANSACTION,
    payload: trxCount
  }
}


// REQUEST FROM API
export const addTransaction = (payload) => (dispatch) =>
  api.transaction.create(payload);

export const getIncompleteTransaction = () => (dispatch) =>
  api.transaction.getIncompleteTransaction();

export const completeTransaction = (trxId, payload) => (dispatch) =>
  api.transaction.completeTransaction(trxId, payload)
