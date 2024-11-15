import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import carSlice from "./slices/carSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        car: carSlice,
    },
})