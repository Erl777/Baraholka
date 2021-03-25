import axios from 'axios';

let params = {
    baseURL: 'http://localhost:7007/api/'
};

const api = axios.create(params);

export default api;
