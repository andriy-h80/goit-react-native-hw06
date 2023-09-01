import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import postsSlice from './slices/postSlice';
import commentSlice from './slices/commentsSlice';

const rootReducer = combineReducers({
  user: userSlice,
  post: postsSlice,
  comment: commentSlice
});

export default rootReducer;
