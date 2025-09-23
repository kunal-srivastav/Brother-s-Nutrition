import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../utils/extraReducer";

export const createProduct = createAsyncThunk("products/create", 
    async(productData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/products/create", productData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to create product");
        }
    }
);

export const getProduct = createAsyncThunk("/product/:productId", 
    async(productId, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/products/product/${productId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch Product")
        }
    }
)

export const getAdminProduct = createAsyncThunk("/products/admin", 
    async(_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get("/products/admin");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch admin products")
        }
    } 
)

export const getAllProducts = createAsyncThunk("/products", 
    async({query, category, brand, price, rating, limit, page} = {}, {rejectWithValue}) => {
        try {
            const params = {query, category, brand, price, rating, limit, page};
            const res = await axiosInstance.get(`/products`, {params});
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const updateProduct = createAsyncThunk("/products/update/:productId", 
    async({productId, formData}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.patch(`/products/update/${productId}`, formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to update product");
        }
    }
);

export const deleteProduct = createAsyncThunk("/products/delete", 
    async(productId, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/products/delete/${productId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to delete product");
        }
    }
);