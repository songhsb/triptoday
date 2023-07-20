import axios from 'axios';

const getLikes = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/likes`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getLikes };
