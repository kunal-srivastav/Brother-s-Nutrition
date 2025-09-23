import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/extraReducer";

//worked
export const registerUser = createAsyncThunk("/users/register",
    async(userData, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/users/register", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Registration failed");
        }
});

//worked
export const loginUser = createAsyncThunk("/users/login",
    async({email, password}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/users/login", {email, password});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Login failed");
        }
});

//worked
export const currentUser = createAsyncThunk("/users/current-user",
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get("/users/current-user");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch current user");
        }
});
//worked
export const updatePassword = createAsyncThunk("/users/change-password",
    async({oldPassword, newPassword}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch("/users/change-password", {oldPassword, newPassword});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Password unchanged");
        }
});

//worked
export const updateProfilePic = createAsyncThunk("/users/update-profile",
    async(userData, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch("/users/update-profile", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Update failed");
        }
});

//worked
export const updateAccountInfo = createAsyncThunk("/users/update-account",
    async({name, email, role}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch("/users/update-account", {name, email, role});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Update failed");
        }
});

//worked
export const logout = createAsyncThunk("/users/log-out",
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get("/users/log-out");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Logout failed");
        }
});