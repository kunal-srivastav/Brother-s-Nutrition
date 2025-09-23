import { createSlice } from "@reduxjs/toolkit";
import { uiState } from "../utils/extraReducer";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        ...uiState
    },
    reducers: {
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        },
        clearMsg: (state, action) => {
            state.errorMsg = null;
            state.successMsg = null;
        }
    }
});

export const { setErrorMsg, clearMsg } = messageSlice.actions;

export default messageSlice.reducer;