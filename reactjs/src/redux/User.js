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
            showEmail: false,
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

        setShowEmail: (state, action) => {
            state.value.showEmail = action.payload;
        },

        resetUserState: (state, action) => {
            state.value.email = userSlice.getInitialState().value.email;
            state.value._id = userSlice.getInitialState().value._id;
        },
    },
});

export const {
    setUser,
    setUserName,
    setUserAvatar,
    setShowEmail,
    resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
