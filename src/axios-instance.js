import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://apollo-io-backend.herokuapp.com/api/'
});

export default instance;
