import {
  ADD_CART,
  REPLACE_STOCK_CART,
  DELETE_CART,
  CLEAR_CART
} from '../types';

const INITIAL_STATE = {
  data: []
}
export default function (state=INITIAL_STATE, action={}){
  switch (action.type) {
    case ADD_CART:
      var item = action.payload;
      item.quantity = 1;
      var cart =  [
        ...state.data.slice(0, state.data.length),
        item
      ];
      return {
        ...state,
        data: cart
      };
    case REPLACE_STOCK_CART:
      var payload = action.payload;
      var existCart = state.data[payload.index];
      existCart.quantity = payload.quantity;
      var cart = state.data.slice();
      return {
        ...state,
        data: cart
      };
    case DELETE_CART:
      var payload = action.payload;
      var cart = state.data;
      cart.splice(payload.index, 1);
      var data = cart.slice();
      return {
        ...state,
        data
      }
    case CLEAR_CART:
      let data = [];
      return {
        ...state,
        data
      }
    default:
      return state;

  }
}
