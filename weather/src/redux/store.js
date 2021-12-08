import { configureStore } from "@reduxjs/toolkit";
import weather from "./weather/weatherSlice";
import locationSearch from "./locationSearch/locationSearchSlice";

const store = configureStore({
  reducer: {
    weather,
    locationSearch,
  },
});

export default store;
