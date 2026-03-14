import axios from "axios";

const axiosapi = axios.create({
    baseURL: 'https://autofinanceapi.kabsdigital.com/api',
    withCredentials: true,
});
//local:  baseURL: 'http://localhost:8000/api',
export default axiosapi