import { combineReducers } from 'redux';

import Auth  from './auth';
import Cart from './cart';
import Transaction from './transaction';

const rootReducers = combineReducers({
  auth: Auth,
  cart: Cart,
  transaction: Transaction
});

export default rootReducers;
