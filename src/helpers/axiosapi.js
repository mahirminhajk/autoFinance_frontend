<<<<<<< HEAD
import axios from "axios";

const axiosapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
});

export default axiosapi
=======
import axios from "axios";

const axiosapi = axios.create({
    baseURL: 'https://autofinanceapi.kabsdigital.com/api',
    withCredentials: true,
});
//fix
export default axiosapi
>>>>>>> 9a80fc8 (add comment to indicate a fix in axiosapi configuration)
