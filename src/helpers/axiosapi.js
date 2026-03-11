import axios from "axios";

const axiosapi = axios.create({
    baseURL: 'https://auto-finance-backend.vercel.app/api',
    withCredentials: true,
});

export default axiosapi