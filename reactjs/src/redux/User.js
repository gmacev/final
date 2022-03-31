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
            console.log("fsagas");
        },

        setUserEmail: (state, action) => {
            state.value.email = action.payload;
        },

        setUserName: (state, action) => {
            state.value.username = action.payload;
        },

        resetUserState: (state, action) => {
            state.value.email = userSlice.getInitialState().value.email;
        },
    },
});

export const { setUserId, setUserEmail, setUserName, resetUserState } =
    userSlice.actions;

export default userSlice.reducer;
