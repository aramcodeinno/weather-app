import { WEATHER_API_KEY } from "../constants/api";
import Axios from "./api";

const searchLocation = async (searchValue) => {
    return Axios.get(
        `/search.json?q=${searchValue}&key=${WEATHER_API_KEY}&size=100`
    );
};

const locationSearchApi = {
    searchLocation,
};

export default locationSearchApi;
