import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pr5-ltp-rn-back.onrender.com',

  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
