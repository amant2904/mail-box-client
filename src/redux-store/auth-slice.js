import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    api_key: "AIzaSyCvpqaeRd-dg4DhlGlzw4QpazIPDBUKnVc",
    isLoggedIn: false,
    tokenId: "",
    user_email: "",
    fullName: ""
}

const authSlice = createSlice({
    name: "Authentication",
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.tokenId = action.payload.tokenId;
            state.user_email = action.payload.email;
            state.fullName = action.payload.fullName;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.tokenId = "";
            state.user_email = "";
            state.fullName = "";
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
