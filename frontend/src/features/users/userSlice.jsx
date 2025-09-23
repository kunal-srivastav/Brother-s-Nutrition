import { createSlice } from "@reduxjs/toolkit";
import { currentUser, loginUser, logout, registerUser, updateAccountInfo, updatePassword, updateProfilePic } from "./userController.jsx";
import { handleOnPending, handleOnReject, uiState } from "../utils/extraReducer.jsx"

const userSlice = createSlice({
    name: "user",
    initialState: {
       loggedInUser: null,
       ...uiState
    },
    reducers: {
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        },
        clearMsg: (state, action) => {
            state.errorMsg = null,
            state.successMsg = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, handleOnPending)
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            const { message, user } = action.payload;
            state.successMsg = message;
            state.loggedInUser = user;
        })
        .addCase(registerUser.rejected, handleOnReject)

        .addCase(loginUser.pending, handleOnPending)
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            const { message, user } = action.payload;
            state.successMsg = message;
            state.loggedInUser = user;
        })
        .addCase(loginUser.rejected, handleOnReject)

        .addCase(currentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInUser = action.payload.currentUser;
        })
        
        .addCase(updatePassword.pending, handleOnPending)
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.successMsg = action.payload.message;
        })
        .addCase(updatePassword.rejected, handleOnReject)

        .addCase(updateProfilePic.pending, handleOnPending)
        .addCase(updateProfilePic.fulfilled, (state, action) => {
            state.loading = false;
            const { message, updatedUser } = action.payload;
            state.successMsg = message;
            state.loggedInUser = updatedUser;
        })
        .addCase(updateProfilePic.rejected, handleOnReject)

        .addCase(updateAccountInfo.pending, handleOnPending)
        .addCase(updateAccountInfo.fulfilled, (state, action) => {
            state.loading = false;
            const { message, user } = action.payload;
            state.successMsg = message;
            state.loggedInUser = user;
        })
        .addCase(updateAccountInfo.rejected, handleOnReject)

        .addCase(logout.pending, handleOnPending)
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInUser = null;
            state.successMsg = action.payload.message;
        })
        .addCase(logout.rejected, handleOnReject)
    }
});

export const { setErrorMsg, clearMsg } = userSlice.actions;

export default userSlice.reducer;