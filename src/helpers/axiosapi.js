import axios from "axios";

const axiosapi = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});
//fix1
export default axiosapi