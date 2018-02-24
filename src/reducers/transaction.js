import { UPDATE_PENDING_TRANSACTION } from '../types';

const INITIAL_STATE = {
  pendingTransaction: 0
};

export default function (state=INITIAL_STATE, action={}){
  switch (action.type) {
    case UPDATE_PENDING_TRANSACTION:
      let trxCount = action.payload;
      return {
        ...state,
        pendingTransaction: trxCount
      }
    default:
      return state;

  }
}
