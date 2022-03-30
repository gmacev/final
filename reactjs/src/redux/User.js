import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userData",
    initialState: {
        value: {
            _id: "",
            email: "",
        },
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.value.email = action.payload;
        },

        setUserId: (state, action) => {
            state.value.email = action.payload;
        },
    },
});

export const { setUserEmail, setUserId } = userSlice.actions;

export default userSlice.reducer;
