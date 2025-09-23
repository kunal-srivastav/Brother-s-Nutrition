import express from "express";
import { createOrder, getAdminOrders, getMyOrders, updateUserOrder, deleteOrder, deleteOrderByAdmin } from "../controllers/orderController.js";
import { isAdmin, isLoggedIn } from "../middleWare/isLoggedIn.js";
const router = express.Router();

router.get("/", isLoggedIn, getMyOrders);

router.get("/admin", isLoggedIn, isAdmin, getAdminOrders);

router.patch("/update/:orderId", isLoggedIn, isAdmin, updateUserOrder);

router.post("/place-order", isLoggedIn, createOrder);

router.get("/delete/:orderId", isLoggedIn, deleteOrder);

router.get("/admin/delete/:orderId", isLoggedIn, isAdmin, deleteOrderByAdmin);

export default router;