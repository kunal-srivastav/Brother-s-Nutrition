import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice.jsx";
import productReducer from "../features/products/productSlice.jsx";
import cartReducer from "../features/carts/cartSlice.jsx";
import orderReducer from "../features/orders/orderSlice.jsx";
import reviewReducer from "../features/reviews/reviewSlice.jsx";
import messageReducer from "../features/messages/messagesSlice.jsx";

export const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        carts: cartReducer,
        orders: orderReducer,
        reviews: reviewReducer,
        messages: messageReducer
    }
})
