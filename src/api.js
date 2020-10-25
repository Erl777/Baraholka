import axios from 'axios';

let params = {
    baseURL: 'http://localhost:3000/api/'
};

const api = axios.create(params);

export default api;