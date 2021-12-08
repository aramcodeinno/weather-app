import axios from "axios";
import { OPEN_WEATHER_BASE_URL } from "../constants/api";

const createAxios = (headers = {}) => {
    const newAxios = axios.create({
        baseURL: OPEN_WEATHER_BASE_URL,
    });

    newAxios.defaults.headers = {
        ...newAxios.defaults.headers,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        ...headers,
    };

    newAxios.interceptors.request.use(
        (config) => {
            const newConfig = { ...config };
            newConfig.url = newConfig.baseURL + newConfig.url;
            return newConfig;
        },
        (error) => Promise.reject(error)
    );

    newAxios.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );

    return newAxios;
};

const Axios = createAxios();

export default Axios;
