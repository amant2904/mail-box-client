import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recieved: [],
    sent: []
}

const mailSlice = createSlice({
    name: "Mails",
    initialState,
    reducers: {
        firstFetch(state, action) {
            for (let key in action.payload.recieved) {
                state.recieved.push({
                    id: key,
                    by: action.payload.recieved[key].by,
                    title: action.payload.recieved[key].title,
                    message: action.payload.recieved[key].message
                });
            }
            for (let key in action.payload.sent) {
                state.sent.push({
                    id: key,
                    to: action.payload.sent[key].to,
                    title: action.payload.sent[key].title,
                    message: action.payload.sent[key].message
                })
            }
        },
        clearMail(state) {
            state.recieved = [];
            state.sent = [];
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;