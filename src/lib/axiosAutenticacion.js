import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://192.188.52.253:21518',
  //baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default axios;
