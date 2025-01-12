import axios from 'axios';

export const getHeadline = async () => {
  try {
    const {data} = await axios.get('/top-headlines?country=us');
    return Promise.resolve(data.articles);
  } catch (error) {
    return Promise.reject(error);
  }
};