import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder, getMyOrders, getAdminOrders, placeOrder, updateUserOrder, deleteOrderByAdmin } from "./orderController";
import { handleOnPending, handleOnReject, uiState } from "../utils/extraReducer";


const orderSlice = createSlice({
    name: "order",
    initialState: {
        myOrders: [],
        adminProductOrders: [],
        ...uiState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMyOrders.pending, handleOnPending)
        .addCase(getMyOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.myOrders = action.payload.myOrders
        })
        .addCase(getMyOrders.rejected, handleOnReject)

        .addCase(getAdminOrders.pending, handleOnPending)
        .addCase(getAdminOrders.fulfilled, (state, action) => {
            state.loading = false;
            const { orders } = action.payload;
            state.adminProductOrders = orders;
        })
        .addCase(getAdminOrders.rejected, handleOnReject)

        .addCase(placeOrder.pending, handleOnPending)
        .addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            const { message, newOrder } = action.payload;
            state.myOrders.unshift(newOrder);
            state.message = message;
        })
        .addCase(placeOrder.rejected, handleOnReject)

        .addCase(updateUserOrder.pending, handleOnPending)
        .addCase(updateUserOrder.fulfilled, (state, action) => {
            state.loading = false;
            const { updatedOrder } = action.payload;
            let order = state.adminProductOrders.find(ord => ord._id === updatedOrder?._id);
            if (order) {
            order.status = updatedOrder.status; // or copy other fields
            }
        })
        .addCase(updateUserOrder.rejected, handleOnReject)

        .addCase(deleteOrder.pending, handleOnPending)
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            const { cancelledOrder, message } = action.payload;
            let order = state.myOrders.find(ord => ord._id === cancelledOrder?._id);
            if(order) {
                order.status = cancelledOrder.status;
            }
            state.successMsg = message;
        })
        .addCase(deleteOrder.rejected, handleOnReject)

        .addCase(deleteOrderByAdmin.pending, handleOnPending)
        .addCase(deleteOrderByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            const { deletedOrderId, message } = action.payload;
            state.adminProductOrders = state.adminProductOrders.filter(ord => ord._id !== deletedOrderId);
            state.successMsg = message;
        })
        .addCase(deleteOrderByAdmin.rejected, handleOnReject)
    }
});

export default orderSlice.reducer;