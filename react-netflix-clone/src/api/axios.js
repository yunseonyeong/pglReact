import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "915abb342bad7a0a78cac9fa6fa5bb97",
    language: "ko-KR",
  },
});

export default instance;