import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "./useAuthProvider";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_serverAddress}`,
})
const useAxiosSecure = () => {
    const { provideSignOut } = useAuthProvider();
    const navigate = useNavigate();


    useEffect(() => {

        axiosSecure.interceptors.request.use((config) => {

            const token = Cookies.get('access-token');

            if (token) {

                config.headers.Authorization = `Bearer ${token}`
            }
            config.withCredentials = true
            return config;
        })
        axiosSecure.interceptors.response.use((response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log('out1')
                    await provideSignOut();
                    // navigate('/login');

                }
                return Promise.reject(error);
            }
        );
    }, [provideSignOut, navigate]);
    return axiosSecure ;
};

export default useAxiosSecure;