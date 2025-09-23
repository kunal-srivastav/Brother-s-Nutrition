import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/extraReducer";

//worked
export const getMyOrders = createAsyncThunk("/orders", 
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/orders/`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch orders");
        }
    }
);

//worked
export const placeOrder = createAsyncThunk("/order/place-order", 
    async({deliveryData, orderItems, totalPrice}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/orders/place-order", {deliveryData, orderItems, totalPrice});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to place order");
        }
    }
);

//worked
export const deleteOrder = createAsyncThunk("/delete", 
    async(orderId, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/orders/delete/${orderId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to delete order");
        }
    }
);

//worked
export const getAdminOrders = createAsyncThunk("/orders/admin", 
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/orders/admin`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to delete order");
        }
    }
);

//worked
export const updateUserOrder = createAsyncThunk("/orders/update", 
    async({orderId, status}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch(`/orders/update/${orderId}`, {status});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to update status")
        }
    }
) 

export const deleteOrderByAdmin = createAsyncThunk("/orders/admin/delete", 
    async(orderId, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/orders/admin/delete/${orderId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to delete order");
        }
    }
)