import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherApi from "../../api/weather";
import { initialState } from "../initialState";

export const getWeather = createAsyncThunk(
    "weather/getWeather",
    async (searchValue) => {
        const response = await weatherApi.getWeather(searchValue);
        return response.data;
    }
);

export const weatherSlice = createSlice({
    name: "weather",
    initialState: initialState.weather,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const { incrementByAmount } = weatherSlice.actions;

export const selectWeatherData = (state) => state.weather.data;
export const selectWeatherCurrentData = (state) => state.weather.data.current;
export const selectWeatherForecastData = (state) => state.weather.data.forecast;
export const selectWeatherLocationData = (state) => state.weather.data.location;

export default weatherSlice.reducer;
