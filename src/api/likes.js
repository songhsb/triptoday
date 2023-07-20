import axios from 'axios';

const getLikes = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/likes`);
  return response.data;
};

const addPostIdToLikes = async newLikes => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/likes`, newLikes);
};

const patchLikes = async ({ switchedLikes, postId }) => {
  const newLikes = { id: postId, userList: switchedLikes };
  try {
    const res = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/likes/${postId}`, newLikes);
    console.log('api에서 res', res);
  } catch (error) {
    console.log('api에서 error', error);
  }
};
export { getLikes, addPostIdToLikes, patchLikes };
