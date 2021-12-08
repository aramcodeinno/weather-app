import Forecast from "./Forecast";
import Highlights from "./Highlights";
import { makeStyles } from "@material-ui/core";
import { LIGHT_GRAY } from "../../constants/ColorConstants";

const useStyles = makeStyles({
    mainDiv: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "80%",
        alignItems: "center",
        backgroundColor: LIGHT_GRAY,
        overflow: "hidden",
        overflowY: "auto",
    },
});

const ForecastWithHighlights = () => {
    const classes = useStyles();

    return (
        <div className={classes.mainDiv}>
            <Forecast />
            <Highlights />
        </div>
    );
};

export default ForecastWithHighlights;
