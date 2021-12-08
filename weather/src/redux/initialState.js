export const initialState = {
    weather: {
        data: {
            current: null,
            forecast: null,
            location: null,
        },
        loading: false,
    },
    locationSearch: {
        value: null,
        searchText: "",
        data: [],
        loading: false,
        initialLocation: null,
    },
};
