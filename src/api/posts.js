import axios from 'axios';

const getPosts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
    return response;
  } catch (error) {
    return error;
  }
};

const addPosts = async newPosts => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPosts);
};
const updatePosts = async ({ id, posts, newPosts }) => {
  await axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, { ...posts, ...newPosts });
};
const deletePosts = async id => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
};
export { getPosts, addPosts, updatePosts, deletePosts };
