import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./User";

export default configureStore({
    reducer: {
        user: userDataReducer,
    },
});
