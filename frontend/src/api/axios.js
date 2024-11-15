import axios from 'axios';

const localIP = 'http://localhost:3000/api';
const sharedIP = 'http://192.168.1.138:3000/api';
const renderIP = 'https://mbep-backend.onrender.com/api'

const axiosInstance = axios.create({
  baseURL: renderIP,
});

export default axiosInstance;
