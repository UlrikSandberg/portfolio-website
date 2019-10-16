import { combineReducers } from "redux";

import blogPostsReducer from "./blogPostsReducer";

export default combineReducers({
  blogPosts: blogPostsReducer
});
