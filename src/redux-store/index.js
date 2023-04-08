import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import uiReducer from "./ui-slice";
import mailReducer from "./mail-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        mail: mailReducer
    }
})

export default store;