import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userData",
    initialState: {
        value: {
            _id: "",
            email: "",
            username: "",
            registeredTimeStamp: 0,
            postCount: 0,
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },

        setUserName: (state, action) => {
            state.value.username = action.payload;
        },

        resetUserState: (state, action) => {
            state.value.email = userSlice.getInitialState().value.email;
        },
    },
});

export const { setUser, setUserName, resetUserState } = userSlice.actions;

export default userSlice.reducer;
