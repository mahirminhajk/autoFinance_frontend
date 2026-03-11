import axios from "axios";

const axiosapi = axios.create({
    baseURL: 'https://autofinanceapi.kabsdigital.com/api',
    withCredentials: true,
});

export default axiosapi