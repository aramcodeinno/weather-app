import ForecastWithHighlights from "./detailedInfo/ForecastWithHighlights";
import BriefData from "./leftSideBar/BriefData";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationSearchValue } from "../redux/locationSearch/locationSearchSlice";
import { useEffect } from "react";
import {
    getWeather,
    selectWeatherCurrentData,
} from "../redux/weather/weatherSlice";

const useStyles = makeStyles({
    mainDiv: {
        display: "flex",
        alignItems: "stretch",
        overflowY: "auto",
        flex: 1,
    },
    errorMessage: {
        textAlign: "center",
    },
});

const MainContainer = () => {
    const classes = useStyles();

    const searchValue = useSelector(selectLocationSearchValue);
    const weatherData = useSelector(selectWeatherCurrentData);
    const dispatch = useDispatch();
    useEffect(() => {
        if (searchValue) {
            dispatch(getWeather(searchValue));
        }
    }, [searchValue, dispatch]);

    return (
        <>
            {weatherData ? (
                <div className={classes.mainDiv}>
                    <BriefData />
                    <ForecastWithHighlights />
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default MainContainer;
