import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/extraReducer";

//worked
export const createReview = createAsyncThunk("/create", 
    async({rating, comment, productId}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post(`/reviews/${productId}/create`, {rating, comment});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to create review");
        }
    }
);

//worked
export const updateReview = createAsyncThunk("/update", 
    async({reviewId, rating, comment, }, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch(`/reviews/update/${reviewId}`, {rating, comment});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to update review");
        }
});

//worked
export const deleteReview = createAsyncThunk("/delete", 
    async(reviewId, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/reviews/delete/${reviewId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to delete review");
        }
});

//worked
export const getAllReviews = createAsyncThunk("/reviews", 
    async({productId, pageNum}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/reviews/${productId}?page=${pageNum}&limit=5`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch reviews");
        }
});