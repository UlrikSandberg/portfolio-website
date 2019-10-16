import { fetchBlogPostsAsync, fetchBlogPostAsync } from "../api/backend";
import { FETCH_BLOGPOSTS, FETCH_BLOGPOST } from "./actionsTypes";

export const fetchBlogPosts = (page, pageSize) => {
  //This is not async because we are currently not fetching from api yet!

  //Fetch and return blog Posts from API
  const response = fetchBlogPostsAsync(page, pageSize);

  return {
    type: FETCH_BLOGPOSTS,
    payload: response
  };
};

export const fetchBlogPost = id => {
  //This is not async because we are currently not fetching from api yet!

  // Fetch and return a single blog post from API!
  const response = fetchBlogPostAsync(id);

  return {
    type: FETCH_BLOGPOST,
    payload: response
  };
};
