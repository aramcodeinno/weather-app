import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import {
    DARK_BLUE,
    LIGHT_BLUE,
    PINK_SWAN,
    SNUFF,
} from "../../constants/ColorConstants";
import { selectWeatherCurrentData } from "../../redux/weather/weatherSlice";
import { getWindDirectionText } from "../../utils/weather";

const useStyles = makeStyles({
    title: {
        margin: 20,
        fontSize: 24,
        color: DARK_BLUE,
    },
    cardsContainer: {
        display: "flex",
    },

    card: {
        padding: 8,
        margin: 8,
        border: `1px ${PINK_SWAN} solid`,
        borderRadius: 10,
        backgroundColor: SNUFF,
        textAlign: "center",
    },
    highlightValue: {
        fontSize: 16,
        color: DARK_BLUE,
    },
    highlightTitle: {
        color: LIGHT_BLUE,
        marginBottom: 5,
        fontSize: 13,
    },
});

const WEATHER_DATA = [
    { key: "pressure_mb", label: "Pressure (MB)" },
    { key: "humidity", label: "Humidity (%)" },
    { key: "wind_kph", label: "Wind speed (k/h)" },
    {
        key: "wind_dir",
        label: "Wind direction",
        valueRenderer: getWindDirectionText,
    },
    { key: "cloud", label: "Cloud" },
    { key: "vis_km", label: "Visibility (km)" },
];

const Highlights = () => {
    const classes = useStyles();

    const weatherData = useSelector(selectWeatherCurrentData) || {};

    return (
        <>
            <div className={classes.title}>Today highlights</div>
            <div className={classes.cardsContainer}>
                {WEATHER_DATA.map(({ key, label, valueRenderer }) => (
                    <Paper className={classes.card} key={key}>
                        <Typography
                            className={classes.highlightTitle}
                            variant="caption"
                        >
                            {label}
                        </Typography>
                        <Typography
                            className={classes.highlightValue}
                            variant="subtitle1"
                        >
                            {valueRenderer
                                ? valueRenderer(weatherData[key])
                                : weatherData[key]}
                        </Typography>
                    </Paper>
                ))}
            </div>
        </>
    );
};

export default Highlights;
