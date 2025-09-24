import { createSlice } from "@reduxjs/toolkit";
import { getProductsInCart, toggleProductInCart } from "./CartController.jsx";
import { handleOnPending, handleOnReject, uiState } from "../utils/extraReducer";

const calculateTotal = (items) => {
    return items?.reduce((total, item) => total + item?.product?.finalPrice * (item.quantity || 1), 0)
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        added: false,
        totalPrice: 0,
        ...uiState
    },
    reducers: {
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const item = state.cartItems.find(i => i._id === itemId);
            if(item) item.quantity = quantity;
            state.totalPrice = calculateTotal(state.cartItems);
        },
        isProductInCart: (state, action) => {
            state.cartItems?.map(({product}) => {
                if(product._id === action.payload) {
                    state.added = true;
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(toggleProductInCart.pending, handleOnPending)
        .addCase(toggleProductInCart.fulfilled, (state, action) => {
            state.loading = false;
            const { message, cart, added } = action.payload;
            state.added = added;
            state.cartItems = cart;
            state.successMsg = message;
        })
        .addCase(toggleProductInCart.rejected, handleOnReject)

        .addCase(getProductsInCart.pending, handleOnPending)
        .addCase(getProductsInCart.fulfilled, (state, action) => {
            state.loading = false;
            const { message, cart } = action.payload;
            state.cartItems = cart;
            state.totalPrice = calculateTotal(state.cartItems);
            state.successMsg = message;
        })
        .addCase(getProductsInCart.rejected, handleOnReject);
    }
});

export const { updateQuantity, isProductInCart } = cartSlice.actions;
export default cartSlice.reducer;