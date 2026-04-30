import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true //cho phép gửi kèm Cookie
});

export default api;