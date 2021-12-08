import { useSelector } from "react-redux";
import { selectWeatherForecastData } from "../../redux/weather/weatherSlice";
import { Avatar, makeStyles, Paper } from "@material-ui/core";
import { useMemo } from "react";
import m from "moment";
import { LAYOUT_MODE } from "../../constants/layout";
import { useLayout } from "../../hooks/layout";
import {
    DARK_BLUE,
    LIGHT_BLUE,
    NAVY_BLUE,
    PINK_SWAN,
    SNUFF,
} from "../../constants/ColorConstants";

const useStyles = makeStyles({
    forcastMain: {
        display: "grid",
        gridTemplateColumns: ({ layoutMode }) =>
            layoutMode === LAYOUT_MODE.desktop
                ? "repeat(12, 100px)"
                : layoutMode === LAYOUT_MODE.tablet
                ? "repeat(6, 100px)"
                : "repeat(3, 100px)",
        gridColumnGap: 12,
        gridRowGap: 12,
    },
    comingForcast: {
        display: "grid",
        gridTemplateColumns: ({ layoutMode }) =>
            layoutMode === LAYOUT_MODE.desktop
                ? "repeat(12, 'auto')"
                : layoutMode === LAYOUT_MODE.tablet
                ? "repeat(6, auto)"
                : "repeat(3, auto)",
        gridColumnGap: 12,
        gridRowGap: 12,
    },
    title: {
        margin: 20,
        fontSize: 24,
        color: DARK_BLUE,
    },
    card: {
        padding: 8,
        border: `1px ${PINK_SWAN} solid`,
        borderRadius: 10,
        backgroundColor: SNUFF,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 124,
    },
    threeDaysCard: {
        margin: 8,
        padding: 8,
        border: `1px ${PINK_SWAN} solid`,
        borderRadius: 10,
        backgroundColor: SNUFF,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    dayForecastHour: {
        color: LIGHT_BLUE,
        marginBottom: 5,
        fontSize: 13,
    },
    dayForecastWeatherStatus: {
        marginBottom: 10,
        color: NAVY_BLUE,
        textAlign: "center",
    },
    dayForecastTemp: {
        fontSize: 16,
        color: NAVY_BLUE,
    },
    comingForecastDay: {
        color: LIGHT_BLUE,
    },
    comingForcastWeatherStatus: {
        marginBottom: 10,
        color: NAVY_BLUE,
        textAlign: "center",
    },
    comingForecast: {
        display: "flex",
    },
    comingForecastTempLabel: {
        marginBottom: 5,
        color: NAVY_BLUE,
    },
    avatar: {
        margin: "2px auto",
    },
});

const Forecast = () => {
    const { mode: layoutMode } = useLayout();
    const classes = useStyles({ layoutMode });
    const { forecastday = [] } = useSelector(selectWeatherForecastData) || {};
    const hours = useMemo(
        () =>
            (
                forecastday.find(
                    (d) => new Date(d.date).getDate() === new Date().getDate()
                ) || {}
            ).hour || [],
        [forecastday]
    );
    return (
        <>
            <div className={classes.title}>Day Forecast</div>
            <div className={classes.forcastMain}>
                {hours.map((hourData) => {
                    const {
                        condition: { text, icon } = {},
                        time,
                        temp_c,
                    } = hourData;
                    return (
                        <Paper className={`${classes.card}`}>
                            <div className={classes.dayForecastHour}>
                                {time.split(" ")?.[1]}
                            </div>
                            <div className={classes.dayForecastWeatherStatus}>
                                {text}
                            </div>
                            <div style={{ flex: 1 }} />
                            {icon && <Avatar src={`https:${icon}`} />}
                            <div className={classes.dayForecastTemp}>
                                {temp_c} ℃
                            </div>
                        </Paper>
                    );
                })}
            </div>
            <div className={classes.title}>Coming 3 day forecast</div>
            <div className={classes.comingForecast}>
                {forecastday.map((d) => {
                    const {
                        day: {
                            condition: { text, icon } = {},
                            maxtemp_c,
                            mintemp_c,
                            maxwind_kph,
                        } = {},
                        date,
                    } = d;
                    return (
                        <Paper className={` ${classes.threeDaysCard}`}>
                            <div>
                                <div
                                    variant="h4"
                                    component="div"
                                    align="center"
                                    className={classes.comingForecastDay}
                                >
                                    {m(date).format("dddd")}
                                </div>
                                <div>
                                    <div flex={3}>
                                        <div
                                            variant="body1"
                                            className={
                                                classes.comingForcastWeatherStatus
                                            }
                                        >
                                            {text}
                                        </div>
                                        {icon && (
                                            <Avatar
                                                className={classes.avatar}
                                                variant="square"
                                                src={`https:${icon}`}
                                            />
                                        )}
                                    </div>
                                    <div flex={5}>
                                        <div>
                                            <span
                                                className={
                                                    classes.comingForecastTempLabel
                                                }
                                            >
                                                Min temperature
                                            </span>
                                            <span
                                                className={
                                                    classes.dayForecastTemp
                                                }
                                            >
                                                {" "}
                                                {mintemp_c} ℃
                                            </span>
                                        </div>
                                        <div>
                                            <span
                                                className={
                                                    classes.comingForecastTempLabel
                                                }
                                            >
                                                Max temperature
                                            </span>
                                            <span
                                                className={
                                                    classes.dayForecastTemp
                                                }
                                            >
                                                {" "}
                                                {maxtemp_c} ℃
                                            </span>
                                        </div>
                                        <div>
                                            <span
                                                className={
                                                    classes.comingForecastTempLabel
                                                }
                                            >
                                                Max wind
                                            </span>
                                            <span
                                                className={
                                                    classes.dayForecastTemp
                                                }
                                            >
                                                {" "}
                                                {maxwind_kph} (k/h)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    );
                })}
            </div>
        </>
    );
};

export default Forecast;
