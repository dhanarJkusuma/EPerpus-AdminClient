import { AUTH_LOGIN } from '../types';

export default function (state={}, action={}){
  switch (action.type) {
    case AUTH_LOGIN:
      break;
    default:
      return state;
  }
}
