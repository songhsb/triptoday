import axios from 'axios';

const getComments = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`);
  return response.data;
};

export const getComment = async id => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`);
  return response.data;
};

export const addComment = comment => {
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, comment);
};

export { getComments };
