import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/extraReducer";

export const toggleProductInCart = createAsyncThunk("/cart/add", 
    async({productId, quantity}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post(`/carts/toggle/${productId}`, {quantity});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to Add cart");
        }
    }
);

export const getProductsInCart = createAsyncThunk("/cart/products", 
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/carts/`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch cart products");
        }
    }
);