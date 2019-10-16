import { FETCH_BLOGPOSTS, FETCH_BLOGPOST } from "../actions/actionsTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BLOGPOSTS:
      var blogPosts = [];
      action.payload.forEach(element => {
        blogPosts.push(element);
      });
      return { ...state, posts: blogPosts };
    case FETCH_BLOGPOST:
      var blogPosts = [];
      if (state.posts === null || state.posts === undefined) {
        blogPosts.push(action.payload);
      } else {
        //Find and replace!
        blogPosts = [...state.posts];
        for (let i = 0; i < blogPosts.length; i++) {
          if (blogPosts[i].id === action.payload.id) {
            blogPosts[i] = action.payload;
          }
        }
      }
      return { ...state, posts: blogPosts };
    default:
      return state;
  }
};
