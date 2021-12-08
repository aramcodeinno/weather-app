import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationSearchApi from "../../api/locationSearch";
import { initialState } from "../initialState";

export const searchLocation = createAsyncThunk(
    "locationSearch/searchLocation",
    async (searchValue) => {
        const response = await locationSearchApi.searchLocation(searchValue);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const setInitialLocation = createAsyncThunk(
    "locationSearch/setInitialLocation",
    async (position) => {
        if (!position) {
            return null;
        }
        let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.address.city;
    }
);

export const locationSearchSlice = createSlice({
    name: "locationSearch",
    initialState: initialState.locationSearch,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setLocationSearchValue: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.filter(
                    ({ lat, lon }, i, arr) =>
                        (arr.findIndex((d) => d.lat === lat) === i &&
                            arr.findIndex((d) => d.lon === lon) === i) ||
                        true
                );
            })
            .addCase(setInitialLocation.fulfilled, (state, action) => {
                state.value = {
                    name: action.payload || "London",
                    region: action.payload || "London",
                };
            });
    },
});

export const { setSearchText, setLocationSearchValue } =
    locationSearchSlice.actions;

export const selectData = (state) => state.locationSearch.data;
export const selectIsLoading = (state) => state.locationSearch.loading;
export const selectSearchText = (state) => state.locationSearch.searchText;
export const selectLocationSearchValue = (state) => state.locationSearch.value;

export default locationSearchSlice.reducer;
