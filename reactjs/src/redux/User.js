import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userData",
    initialState: {
        value: {
            _id: "",
            email: "",
            username: "",
            avatar: "",
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

        setUserAvatar: (state, action) => {
            state.value.avatar = action.payload;
        },

        resetUserState: (state, action) => {
            state.value.email = userSlice.getInitialState().value.email;
        },
    },
});

export const { setUser, setUserName, setUserAvatar, resetUserState } =
    userSlice.actions;

export default userSlice.reducer;
