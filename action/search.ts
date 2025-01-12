import axios from "axios";

export const getEverything = async (keyword: string) => {
  try {
    const {data} = await axios.get('/everything', {
      params: {
        q: keyword,
      },
    });
    return Promise.resolve(data.articles);
  } catch (error) {
    return Promise.reject(error);
  }
};