import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false,
    // isOpenModal: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // setIsOpenModal(state, action) {
        //     state.isOpenModal = action.payload;
        // },
        setUser(state, action) {
            state.user = action.payload;
        }
    },
})

export const { setToken, setIsOpenModal, setUser } = authSlice.actions;
export default authSlice.reducer;