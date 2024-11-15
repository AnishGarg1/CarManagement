import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    // car: null,
    carsList: [],
};

const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // setCar(state, action) {
        //     state.car = action.payload;
        // },
        setCarsList(state, action) {
            state.carsList = action.payload;
        },
    }
});

export const { setLoading, setCar, setCarsList } = carSlice.actions;
export default carSlice.reducer;
