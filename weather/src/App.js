import React, { useCallback, useEffect } from "react";
import Header from "./components/header/Header";
import MainContainer from "./components/MainContainer";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setInitialLocation } from "./redux/locationSearch/locationSearchSlice";

const useStyles = makeStyles({
    app: {
        display: "flex",
        height: "100vh",
        flexDirection: "column",
    },
});

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const success = useCallback(
        (position) => {
            if (position) {
                dispatch(setInitialLocation(position));
            }
        },
        [dispatch]
    );

    const fail = useCallback(() => {
        dispatch(setInitialLocation(null));
    }, [dispatch]);

    useEffect(() => {
        navigator.permissions
            .query({
                name: "geolocation",
            })
            .then(function (result) {
                if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(success, fail);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, fail);
                } else if (result.state === "denied") {
                    console.log("denied");
                }
            });
    }, [fail, success]);

    return (
        <div className={classes.app}>
            <Header />
            <MainContainer />
        </div>
    );
}

export default App;
