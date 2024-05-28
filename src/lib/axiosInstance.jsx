import axios from 'axios';

const baseURL = `http://${process.env.NEXT_PUBLIC_SERVER_URL}`;
// const baseURL = 'http://192.168.1.42:5000'
// const baseURL = 'http://localhost:5000'


const axiosInstance = axios.create({
    baseURL
    // You can add headers, timeouts, etc. here
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('userToken');
//         const userToken = JSON.parse(token);
//         if (token) {
//             // config.headers.Authorization = `Bearer ${token}`;
//             config.headers.access_token = userToken;
//         }
//         return config;
//     });

export default axiosInstance;