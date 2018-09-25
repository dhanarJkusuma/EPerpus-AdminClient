import { combineReducers } from 'redux';

import Auth  from './auth';
import Book from './book';


const rootReducers = combineReducers({
  auth: Auth,
  book: Book
});

export default rootReducers;
