import axios from "axios";

const axiosapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
});
//fix

export default axiosapi;
