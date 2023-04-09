import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recieved: [],
    sent: [],
    unread: 0
}

const mailSlice = createSlice({
    name: "Mails",
    initialState,
    reducers: {
        firstFetch(state, action) {
            for (let key in action.payload.recieved) {
                state.recieved.unshift({
                    id: key,
                    by: action.payload.recieved[key].by,
                    title: action.payload.recieved[key].title,
                    message: action.payload.recieved[key].message,
                    unread: action.payload.recieved[key].unread
                });
                if (action.payload.recieved[key].unread) {
                    state.unread += 1;
                }
            }
            for (let key in action.payload.sent) {
                state.sent.unshift({
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
            state.unread = 0;
        },
        unreadfalse(state, action) {
            const item = state.recieved.find((item) => {
                return item.id === action.payload;
            })
            item.unread = false;
            state.unread--;
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;