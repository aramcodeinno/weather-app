import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { NAVY_BLUE, WHITE } from "../../constants/ColorConstants";
import { useLayout } from "../../hooks/layout";
import { LAYOUT_MODE } from "../../constants/layout";
import { selectWeatherCurrentData } from "../../redux/weather/weatherSlice";
import { useSelector } from "react-redux";
import { selectLocationSearchValue } from "../../redux/locationSearch/locationSearchSlice";
import m from "moment";

const useStyles = makeStyles({
    region: {
        fontSize: 24,
        margin: 24,
        letterSpacing: 1.6,
    },
    briefDataMainDiv: {
        height: "100%",
        width: "20%",
        backgroundColor: WHITE,
        paddingLeft: 30,
    },
    weatherIcon: {
        paddingBottom: ({ layoutMode }) =>
            layoutMode === LAYOUT_MODE.desktop
                ? 48
                : layoutMode === LAYOUT_MODE.tablet
                ? 32
                : 24,
    },
    temperatureContainer: {
        fontSize: 24,
        color: NAVY_BLUE,
        paddingBottom: ({ layoutMode }) =>
            layoutMode === LAYOUT_MODE.desktop
                ? 48
                : layoutMode === LAYOUT_MODE.tablet
                ? 32
                : 24,
    },
    dateContainer: {
        fontSize: 18,
        marginBottom: 12,
        color: NAVY_BLUE,
    },
    weatherIconImg: {
        height: 100,
    },
});

const BriefData = () => {
    const { mode: layoutMode } = useLayout();
    const classes = useStyles({ layoutMode });
    const {
        last_updated,
        temp_c,
        feelslike_c,
        condition: { icon } = {},
    } = useSelector(selectWeatherCurrentData) || {};
    const updateDate = new Date(last_updated);
    const { region } = useSelector(selectLocationSearchValue) || {};
    const [now, setNow] = useState(m().format("HH:mm:ss"));

    useEffect(() => {
        const timerId = setInterval(() => setNow(m().format("HH:mm:ss")), 1000);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <div className={classes.briefDataMainDiv}>
            <div className={classes.region}>{region}</div>
            <div className={classes.weatherIcon}>
                {icon && (
                    <img
                        alt="weather-icon"
                        className={classes.weatherIconImg}
                        src={`https:${icon}`}
                    />
                )}
            </div>
            <div className={classes.temperatureContainer}>
                Temperature {temp_c} ℃
            </div>
            <div className={classes.temperatureContainer}>
                Feels like {feelslike_c} ℃
            </div>
            <div className={classes.dateContainer}>
                Last update
                <span>{` ${m(updateDate).format("ddd HH:mm")} `}</span>
            </div>
            <div className={classes.dateContainer}>
                Now
                <span> {now}</span>
            </div>
            <div className={classes.weatherStatus}></div>
        </div>
    );
};

export default BriefData;
