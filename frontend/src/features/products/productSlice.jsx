import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts, updateProduct, deleteProduct, getAdminProduct, getProduct } from "./productController.jsx";
import { handleOnPending, handleOnReject, uiState} from "../utils/extraReducer";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        adminProducts: [],
        totalProducts: 0,
        products: [],
        totalPages: 1,
        relatedProducts: [],
        ...uiState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createProduct.pending, handleOnPending)
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            const { message, newProduct } = action.payload;
            state.products.push(newProduct);
            state.message = message;
        })
        .addCase(createProduct.rejected, handleOnReject)

        .addCase(getProduct.pending, handleOnPending)
        .addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false;
            const { product, relatedProducts } = action.payload;
            state.product = product;
            state.relatedProducts = relatedProducts;
        })

        .addCase(getAdminProduct.pending, handleOnPending)
        .addCase(getAdminProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.adminProducts = action.payload.adminProducts;
        })
        .addCase(getAdminProduct.rejected, handleOnReject)

        .addCase(getAllProducts.pending, handleOnPending)
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            const { message, products, totalPages, totalProducts } = action.payload;
            state.totalPages = totalPages;
            state.products = products;
            state.message = message; 
            state.totalProducts = totalProducts;
        })
        .addCase(getAllProducts.rejected, handleOnReject)

        .addCase(updateProduct.pending, handleOnPending)
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const { message, updatedProduct } = action.payload;
            if (updatedProduct) {        
            state.adminProducts = state.adminProducts.map((p) =>
                p._id === updatedProduct._id ? updatedProduct : p
            );
            state.products = state.products.map((p) =>
                p._id === updatedProduct._id ? updatedProduct : p
            );
        }
            state.message = message;
        })
        .addCase(updateProduct.rejected, handleOnReject)

        .addCase(deleteProduct.pending, handleOnPending)
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            const { message, deletedProductId } = action.payload;
            state.adminProducts = state.adminProducts.filter(p => p._id !== deletedProductId );
            state.message = message; 
        })
        .addCase(deleteProduct.rejected, handleOnReject)
    }
});

export default productSlice.reducer;