import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import {
    searchLocation,
    selectIsLoading,
    selectData,
    selectSearchText,
    selectLocationSearchValue,
    setSearchText,
    setLocationSearchValue,
} from "../../redux/locationSearch/locationSearchSlice";
import { makeStyles, TextField } from "@material-ui/core";
import { LIGHT_GRAY, WHITE } from "../../constants/ColorConstants";

const useStyles = makeStyles({
    autocomplete: {
        width: 300,
        borderRadius: 30,
        backgroundColor: WHITE,
        "&:hover": {
            backgroundColor: LIGHT_GRAY,
        },
        marginLeft: 0,
    },
    withoutPadding: {
        padding: "0 !important",
        borderRadius: 30,
        borderColor: LIGHT_GRAY,
        "&:hover": {
            borderColor: LIGHT_GRAY,
        },
    },
    searchIcon: {
        marginRight: 5,
    },
});

const LocationAutocomplete = () => {
    const styles = useStyles();

    const dispatch = useDispatch();
    const [debouncedSearchValue, setDebouncedLocationValue] = useState("");
    const [open, setOpen] = useState(false);
    const loading = useSelector(selectIsLoading);
    const options = useSelector(selectData);
    const searchText = useSelector(selectSearchText);
    const value = useSelector(selectLocationSearchValue);

    useEffect(() => {
        if (debouncedSearchValue) {
            dispatch(searchLocation(debouncedSearchValue));
        }
    }, [debouncedSearchValue, dispatch]);

    const updateDebouncedSearch = useCallback(
        debounce(setDebouncedLocationValue, 300),
        [setDebouncedLocationValue]
    );

    useEffect(() => {
        updateDebouncedSearch(searchText);
    }, [searchText, updateDebouncedSearch]);

    const onInputChange = (e) => {
        if (value) {
            dispatch(setLocationSearchValue(null));
        }
        dispatch(setSearchText(e.target.value));
    };

    const onValueChange = (event, val) => {
        dispatch(setLocationSearchValue(val));
    };

    return (
        <Autocomplete
            value={value}
            onChange={onValueChange}
            disableClearable
            freeSolo
            className={styles.autocomplete}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => {
                const { InputProps } = params;
                return (
                    <TextField
                        value={searchText}
                        onChange={onInputChange}
                        {...params}
                        InputProps={{
                            ...InputProps,
                            classes: {
                                root: styles.withoutPadding,
                            },
                            endAdornment: (
                                <SearchIcon className={styles.searchIcon} />
                            ),
                        }}
                        variant="outlined"
                    />
                );
            }}
        />
    );
};
export default LocationAutocomplete;
