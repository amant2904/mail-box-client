import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    api_key: "AIzaSyCvpqaeRd-dg4DhlGlzw4QpazIPDBUKnVc"
}

const authSlice = createSlice({
    name: "Authentication",
    initialState: initialState,
    reducers: {

    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
