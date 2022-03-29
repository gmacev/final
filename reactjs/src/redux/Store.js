import { configureStore } from "@reduxjs/toolkit";
import user from "./User";

export default configureStore({
    reducer: {
        user: user,
    },
});
