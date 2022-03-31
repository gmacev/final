import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userData",
    initialState: {
        value: {
            _id: "",
            email: "",
            username: "",
        },
    },
    reducers: {
        setUserId: (state, action) => {
            state.value.email = action.payload;
        },

        setUserEmail: (state, action) => {
            state.value.email = action.payload;
        },

        setUserName: (state, action) => {
            state.value.username = action.payload;
        },
    },
});

export const { setUserId, setUserEmail, setUserName } = userSlice.actions;

export default userSlice.reducer;
