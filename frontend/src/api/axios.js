import axios from 'axios';

const localIP = 'http://localhost:3000/api';
const sharedIP = 'http://192.168.1.138:3000/api';

const axiosInstance = axios.create({
  baseURL: localIP,
});

export default axiosInstance;
