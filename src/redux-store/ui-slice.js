import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: "recieved",
    database_api: "https://mail-box-client-90325-default-rtdb.firebaseio.com"
}

const uiSlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        changeContent(state, action) {
            state.content = action.payload;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;