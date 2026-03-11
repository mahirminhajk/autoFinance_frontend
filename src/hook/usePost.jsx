import { useEffect, useState } from "react";
import axios from 'axios'

const usePost = (url, data) => {
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postData = async () => {
            setLoading(true);
            try {
                const response = await axios.post(url, data);
                if (response.data.success === false) {
                    setError(response.data.message)
                } else {
                    setRes(response.data);
                }
            } catch (err) {
                setError(err)
            }
            setLoading(false);
        }
        postData();
    }, [])

    return { res, loading, error }

}

export default usePost;