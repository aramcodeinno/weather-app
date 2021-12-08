import { makeStyles } from "@material-ui/core";
import { GRAY } from "../../constants/ColorConstants";
import { HEADER_HEIGHT } from "../../constants/layout";
import LocationAutocomplete from "./LocationAutocomplete";

const useStyles = makeStyles({
    headerRoot: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: GRAY,
        height: HEADER_HEIGHT,
        minHeight: HEADER_HEIGHT,
        paddingLeft: 16,
        paddingRight: 16,
        boxShadow: "0px 0px 5px rgba(8, 35, 48, 0.24)",
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.headerRoot}>
            <LocationAutocomplete />
        </div>
    );
};

export default Header;
