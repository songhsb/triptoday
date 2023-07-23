import axios from 'axios';

const getComments = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`);
  return response.data;
};

const addComments = async comments => {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, comments);
};
const updateComments = async ({ id, newComment }) => {
  await axios.put(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`, newComment);
};
const deleteComments = async id => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`);
};

export { getComments, addComments, updateComments, deleteComments };
