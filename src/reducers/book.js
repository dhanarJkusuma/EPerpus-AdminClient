import {
    UPDATE_UPLOADED_COVER_BOOK
} from '../types';

const INITIAL_STATE = {
    updatedBook: {
        code: null,
        coverImage: null
    }
}

export default function(state=INITIAL_STATE, action={}){
    switch(action.type){
        case UPDATE_UPLOADED_COVER_BOOK:
            var book = Object.assign({}, state.updatedBook);
            book.code = action.payload.code;
            book.coverImage = action.payload.coverImage;
            return {
                ...state,
                updatedBook: book
            }
        default:
            return state;
    }
}