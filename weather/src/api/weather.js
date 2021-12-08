import { WEATHER_API_KEY } from "../constants/api";
import Axios from "./api";

const getWeather = async (searchValue) => {
    return Axios.get(
        `/forecast.json?q=${searchValue.name}&key=${WEATHER_API_KEY}&days=7`
    );
};

const weatherApi = {
    getWeather,
};

export default weatherApi;
